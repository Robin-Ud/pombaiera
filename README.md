# Jogo do Pombo

Você é um pombo cuidando do bando numa cidade. A cada rodada aparece uma situação
(o bem-te-vi de olho no ninho, salgadinho na faixa de ônibus, forro do mercado ou
marquise da biblioteca?) e duas escolhas: uma faz o bando crescer, a outra encolher.
Depois de escolher, o pombo explica o porquê, sempre com um conceito de **ecologia
de populações**: pirâmide etária, natalidade, mortalidade, capacidade de suporte,
regulação dependente da densidade, metapopulações, nicho e sinantropia.

Trabalho da faculdade (ESALQ/USP).

**Jogar:** https://robin-ud.github.io/pombaiera/ — funciona no celular, dá para
instalar como app e roda offline.

## Terminal

Também tem a versão de terminal, em Python puro:

```bash
python3 jogo_pombo.py                 # 20 rodadas sorteadas do banco
python3 jogo_pombo.py --rounds 5      # partida curta
python3 jogo_pombo.py --seed 42       # mesma ordem sempre
python3 jogo_pombo.py --auto best     # teste: sempre a melhor escolha
```

## Arquivos

- `perguntas.json` — as perguntas, por categoria (fonte única)
- `gerar_perguntas_js.py` — gera `web/perguntas.js` a partir do JSON; rode de novo depois de editar
- `web/` — o jogo web (HTML/CSS/JS sem framework, PWA), publicado pelo GitHub Pages a cada push
- `metricas/` — métricas anônimas de partida no Supabase (sem dado pessoal); veja o `LEIA-ME.md`
- `Perguntas jogo do pombo.md` — o texto original das perguntas
