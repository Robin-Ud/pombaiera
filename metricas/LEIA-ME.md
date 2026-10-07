# Métricas do Jogo do Pombo

O jogo anota o que acontece em cada partida (sem nenhum dado pessoal) e manda para um banco de dados
no Supabase. Só você consegue ver as anotações.

## Configurar (uma vez só)

1. **Crie o projeto** em [supabase.com](https://supabase.com) → *New project*.
   - Senha do banco: clique em *Generate a password* e guarde. O jogo não usa essa senha.
   - Deixe **Enable Data API** marcado e **desmarque** *Automatically expose new tables*.
2. **Crie o caderno de anotações:** no menu da esquerda, abra **SQL Editor**, cole o conteúdo inteiro de
   [`schema.sql`](schema.sql) e clique em **Run**. Deve aparecer "Success".
3. **Pegue os dois códigos:** abra **Project Settings → API Keys** (ou *Connect*). Copie:
   - a **Project URL** (algo como `https://abcdxyz.supabase.co`)
   - a chave **publishable** (`sb_publishable_...`) ou, se só existir a antiga, a **anon public**.
     ⚠️ Nunca use a chave *secret* / *service_role*: ela dá acesso total ao banco.
4. **Cole no jogo:** em [`web/metrics.js`](../web/metrics.js), preencha:
   ```js
   const SUPABASE_URL = "https://abcdxyz.supabase.co";
   const SUPABASE_KEY = "sb_publishable_...";
   ```
   Essa chave pode ficar pública: com ela só dá para *acrescentar* anotações, nunca ler, apagar ou mudar.
5. Faça commit e push. O GitHub Pages publica sozinho. Quem já tem o app instalado recebe a
   versão nova na segunda vez que abrir.

Enquanto isso não está preenchido, o jogo funciona normalmente, não manda nada e esconde a avaliação.
Partidas abertas com `?auto`, `?seed` ou `?debug` também não contam.

## Ver os resultados

No Supabase, abra **Table Editor** e troque o schema de `public` para **`metricas`** no seletor do topo.
Ou rode no SQL Editor, por exemplo, `select * from metricas.resumo;`.

| Tabela | O que mostra |
|---|---|
| `resumo` | partidas, **% que terminou**, % que sobreviveu / foi extinta / desistiu, minutos de jogo, % que jogou de novo, nota média |
| `finais` | como as partidas acabam: em qual faixa sobreviveu, em qual rodada foi extinta ou desistiu |
| `perguntas` | por pergunta: % de acerto, segundos pensando, segundos lendo a explicação, quantos desistiram logo depois |
| `avaliacoes` | estrelas por tipo de final |
| `comentarios` | o que as pessoas escreveram, mais recentes primeiro |
| `partidas` | uma linha por partida (os outros relatórios saem daqui) |

### Como ler a tabela `perguntas`
- **pct_acerto perto de 100%**: fácil demais, quase ninguém erra.
- **pct_acerto baixo (menos de 40%)**: confusa, ou a resposta "certa" não é óbvia.
- **pct_desistiu_depois alto**: a pessoa respondeu e fechou o jogo. Talvez a pergunta seja chata ou a explicação longa demais.
- **seg_lendo_explicacao muito baixo**: ninguém está lendo a explicação.

O código da pergunta (`q01`, `q02`…) é o campo `id` em `perguntas.json`. A coluna `inicio_do_texto` ajuda a reconhecer.

Uma partida só conta como "desistiu" uma hora depois de começar sem terminar. Antes disso, ela aparece como `jogando`.
