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

### Aparelho de teste
Abra o jogo **uma vez** com `?teste` no fim do endereço (ex.: `robin-ud.github.io/pombaiera/?teste`). Daí em
diante, esse aparelho fica marcado: aparece um selo 🧪 teste no canto, as partidas dele chegam no banco com
`"test": true` e ficam fora de todos os relatórios. Pra desmarcar, abra uma vez com `?teste=0`.
A diferença pro `?debug`: com `?teste` os dados chegam (dá pra mostrar no painel ao vivo), só não contam.

### Não deixar o banco pausar
O plano grátis do Supabase pausa o projeto depois de 7 dias sem uso (o endereço some e o jogo para de mandar).
O [`manter_acordado.sh`](manter_acordado.sh) manda um evento de teste por dia (`"test": true, "keepalive": true`,
sempre do mesmo aparelho `00000000-0000-4000-8000-00000000acad`), que fica fora dos relatórios. Ele roda no
cron da VM (`ssh oci`), às 9h17, em `~/deving/pombaiera/`, com log em `acordado.log` na mesma pasta. Se mudar o
script, copie de novo com `scp metricas/manter_acordado.sh oci:deving/pombaiera/`.
Se pausar mesmo assim: Supabase → projeto → *Restore project*.

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

## Painel ao vivo (pra apresentar)

Mostra as partidas chegando enquanto a turma joga: cada pombo que nasce, cada resposta, cada final.
Bom pra projetar e provar que o banco está funcionando.

```bash
python3 metricas/ao_vivo.py      # abre http://localhost:8790
```

Na primeira vez ele pede a chave **secreta** (Supabase → Project Settings → API Keys → *Secret keys*,
a `sb_secret_...`) e guarda em `metricas/.chave-secreta`, que o git ignora. Ela fica só no seu computador:
a página fala com o `ao_vivo.py`, e só ele fala com o Supabase. Nunca cole essa chave no `web/`.

- Cada resposta chega quando a pessoa aperta "Próxima rodada" (antes disso o jogo ainda está medindo
  quanto tempo ela passa lendo a explicação).
- Comentários ficam escondidos (pra não projetar algo inesperado); aperte <kbd>C</kbd> pra mostrar.
- Se aparecer "permission denied", rode no SQL Editor: `grant select on public.events to service_role;`
- Pra demonstrar, jogue num aparelho marcado com `?teste`: a partida aparece no painel com o selo 🧪 e não entra nos números.

### Zerar antes de uma apresentação
Primeiro guarde uma cópia (fica em `metricas/backups/`, fora do git), depois rode no SQL Editor:
`delete from public.events;` e dê F5 no painel. Não use `truncate ... restart identity`: o painel aberto
se guia pelo número do último evento e ficaria esperando números que já passaram.
