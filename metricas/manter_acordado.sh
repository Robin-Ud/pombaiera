#!/usr/bin/env bash
# Mantém o Supabase acordado: o plano grátis pausa o projeto depois de 7 dias sem uso.
# Manda um evento de teste ("test": true), que as views de metricas.* e o painel ao vivo ignoram,
# então não suja os dados da turma. Roda no cron da VM (ver LEIA-ME.md).
# Usa a mesma chave pública do jogo (web/metrics.js): só consegue inserir, nada mais.
#
# Uso: ./manter_acordado.sh        → sai 0 se o banco aceitou, 1 se não (cron manda o erro por e-mail/log)
set -euo pipefail

URL="https://mrikgmovjiboencrwqci.supabase.co/rest/v1/events"
CHAVE="sb_publishable_kv1bo9f3hcfjLCF3_Vs0_g_zEvHpOTP"
# Aparelho fixo, para achar estes eventos fácil se um dia precisar apagar.
APARELHO="00000000-0000-4000-8000-00000000acad"

uuid() { cat /proc/sys/kernel/random/uuid; }

corpo=$(printf '{"uid":"%s","session_id":"%s","player_id":"%s","type":"start","data":{"test":true,"keepalive":true}}' \
  "$(uuid)" "$(uuid)" "$APARELHO")

status=$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 -X POST "$URL" \
  -H "apikey: $CHAVE" -H "Content-Type: application/json" -H "Prefer: return=minimal" \
  -d "$corpo") || status=000

if [[ $status == 201 ]]; then
  echo "$(date -Is) ok"
else
  echo "$(date -Is) FALHOU: HTTP $status (000 = projeto pausado ou sem rede)" >&2
  exit 1
fi
