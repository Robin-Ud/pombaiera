#!/usr/bin/env python3
"""Gera web/perguntas.js a partir de perguntas.json.

O navegador bloqueia fetch() de arquivos locais, então o jogo web lê as
perguntas por uma tag <script>. Rode de novo sempre que editar perguntas.json.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent

data = json.loads((ROOT / "perguntas.json").read_text(encoding="utf-8"))
out = ROOT / "web" / "perguntas.js"
out.write_text(
    "// Gerado por gerar_perguntas_js.py — edite perguntas.json, não este arquivo.\n"
    f"window.PERGUNTAS = {json.dumps(data, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
print(f"{out.relative_to(ROOT)}: {len(data['questions'])} perguntas")
