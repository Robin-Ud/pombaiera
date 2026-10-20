#!/usr/bin/env python3
"""Painel ao vivo das métricas: mostra as partidas chegando no Supabase enquanto a turma joga.

Roda só no seu computador. A página não fala direto com o Supabase: quem busca os dados é este
programa, com a chave secreta, que nunca sai da sua máquina. Puro Python, zero deps.

    python3 metricas/ao_vivo.py            # abre http://localhost:8790 no navegador
    python3 metricas/ao_vivo.py --porta 9000 --sem-navegador
"""

import argparse
import getpass
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PASTA = os.path.dirname(os.path.abspath(__file__))
ARQ_CHAVE = os.path.join(PASTA, ".chave-secreta")  # fora do git (.gitignore)
ARQ_PAGINA = os.path.join(PASTA, "ao_vivo.html")
ARQ_METRICS_JS = os.path.join(PASTA, "..", "web", "metrics.js")
LOTE = 1000  # máximo de eventos por pedido ao Supabase


def url_do_supabase():
    """Lê a Project URL do web/metrics.js, para não ter o endereço em dois lugares."""
    if os.environ.get("POMBO_SUPABASE_URL"):
        return os.environ["POMBO_SUPABASE_URL"].rstrip("/")
    with open(ARQ_METRICS_JS, encoding="utf-8") as f:
        achou = re.search(r'SUPABASE_URL\s*=\s*"([^"]+)"', f.read())
    if not achou:
        sys.exit("Não achei SUPABASE_URL em web/metrics.js.")
    return achou.group(1).rstrip("/")


def chave_secreta():
    """Chave secreta: variável POMBO_CHAVE, ou o arquivo .chave-secreta, ou pergunta e guarda."""
    if os.environ.get("POMBO_CHAVE"):
        return os.environ["POMBO_CHAVE"].strip()
    if os.path.exists(ARQ_CHAVE):
        with open(ARQ_CHAVE, encoding="utf-8") as f:
            return f.read().strip()
    print("Falta a chave secreta do Supabase (só precisa uma vez).")
    print("  Supabase → Project Settings → API Keys → Secret keys → copie a sb_secret_...")
    chave = getpass.getpass("  Cole aqui (não aparece na tela): ").strip()
    if chave.startswith("sb_publishable_"):
        sys.exit("Essa é a chave pública: ela não consegue ler os dados. Precisa da sb_secret_...")
    if not chave:
        sys.exit("Nenhuma chave colada.")
    fd = os.open(ARQ_CHAVE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write(chave + "\n")
    print(f"  Guardada em {ARQ_CHAVE} (só você lê, e o git ignora).\n")
    return chave


def buscar_eventos(base, chave, depois):
    """Eventos com id maior que `depois`, em ordem. Devolve (status, corpo)."""
    consulta = urllib.parse.urlencode({
        "select": "id,created_at,uid,session_id,player_id,type,question_id,data",
        "id": f"gt.{depois}",
        "order": "id.asc",
        "limit": LOTE,
    })
    pedido = urllib.request.Request(f"{base}/rest/v1/events?{consulta}", headers={"apikey": chave})
    try:
        with urllib.request.urlopen(pedido, timeout=10) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()
    except (urllib.error.URLError, TimeoutError) as e:
        return 502, json.dumps({"message": f"Sem conexão com o Supabase: {e}"}).encode()


def criar_servidor(porta, base, chave):
    class Painel(BaseHTTPRequestHandler):
        def responder(self, status, corpo, tipo):
            self.send_response(status)
            self.send_header("Content-Type", tipo)
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(corpo)

        def do_GET(self):
            rota = urllib.parse.urlparse(self.path)
            if rota.path == "/":
                with open(ARQ_PAGINA, "rb") as f:
                    self.responder(200, f.read(), "text/html; charset=utf-8")
            elif rota.path == "/eventos":
                depois = urllib.parse.parse_qs(rota.query).get("depois", ["0"])[0]
                if not depois.isdigit():
                    return self.responder(400, b'{"message":"depois precisa ser numero"}', "application/json")
                status, corpo = buscar_eventos(base, chave, int(depois))
                self.responder(status, corpo, "application/json")
            else:
                self.responder(404, b"nao achei", "text/plain")

        def log_message(self, *args):
            pass  # a página pede a cada 2 s; não poluir o terminal

    # Só localhost: ninguém na rede da sala consegue usar sua chave por aqui.
    return ThreadingHTTPServer(("127.0.0.1", porta), Painel)


def main():
    p = argparse.ArgumentParser(description="Painel ao vivo das métricas do Jogo do Pombo.")
    # Não use 8765: o jogo já rodou ali em teste e o service worker dele responde no lugar do painel.
    p.add_argument("--porta", type=int, default=8790)
    p.add_argument("--sem-navegador", action="store_true", help="não abrir o navegador sozinho")
    args = p.parse_args()

    base = url_do_supabase()
    chave = chave_secreta()

    status, corpo = buscar_eventos(base, chave, 0)
    if status != 200:
        print(f"⚠ O Supabase respondeu {status}: {corpo[:300].decode(errors='replace')}")
        print("  O painel abre mesmo assim e mostra o erro na tela.\n")

    servidor = criar_servidor(args.porta, base, chave)
    endereco = f"http://localhost:{args.porta}"
    print(f"Painel ao vivo em {endereco}  (Ctrl+C para parar)")
    if not args.sem_navegador:
        webbrowser.open(endereco)
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print()


if __name__ == "__main__":
    main()
