-- Métricas do Jogo do Pombo.
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique em "Run". Pode rodar de novo sem perder dados.
--
-- O jogo só consegue ACRESCENTAR anotações na tabela `events`; ninguém de fora lê, apaga ou altera.
-- Os relatórios ficam no schema `metricas` (no Table Editor, troque o schema de "public" para "metricas"):
--   metricas.resumo      → números gerais: % que termina, tempo de jogo, quem volta, nota média
--   metricas.finais      → como as partidas acabam (faixa final, rodada da extinção, rodada do abandono)
--   metricas.perguntas   → acerto, tempo e desistência por pergunta
--   metricas.avaliacoes  → notas por tipo de final
--   metricas.comentarios → comentários escritos, mais recentes primeiro
--   metricas.partidas    → uma linha por partida (base dos outros)

create table if not exists public.events (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  uid         uuid not null,          -- id do evento gerado no aparelho (reenvios viram duplicatas e são ignorados)
  session_id  uuid not null,          -- uma partida
  player_id   uuid not null,          -- um aparelho, aleatório e anônimo
  type        text not null check (type in ('start', 'answer', 'end', 'rating')),
  question_id text check (char_length(question_id) <= 16),
  data        jsonb not null default '{}'::jsonb check (pg_column_size(data) < 2000)
);
create index if not exists events_session_idx on public.events (session_id);

alter table public.events enable row level security;
revoke all on public.events from anon, authenticated;
grant insert on public.events to anon;
drop policy if exists "jogo pode inserir" on public.events;
create policy "jogo pode inserir" on public.events for insert to anon with check (true);

-- ---------------- relatórios ----------------
create schema if not exists metricas;
revoke all on schema metricas from public, anon, authenticated;

create or replace view metricas.eventos as
select distinct on (uid) * from public.events order by uid, id;

create or replace view metricas.partidas as
select
  s.session_id,
  s.player_id,
  s.created_at as inicio,
  case
    when e.session_id is not null then case when (e.data ->> 'survived')::boolean then 'sobreviveu' else 'extinto' end
    when ult.pop = 0 then 'extinto'  -- o bando acabou e a pessoa fechou antes de ver a tela final
    when s.created_at < now() - interval '1 hour' then 'abandonou'
    else 'jogando'
  end as final,
  coalesce((e.data ->> 'round')::int, ult.rodada, 0) as rodada,
  coalesce(e.data ->> 'band', ult.faixa) as faixa,
  coalesce((e.data ->> 'pop')::int, ult.pop) as pombos,
  round(coalesce((e.data ->> 'durationMs')::numeric, ult.t) / 60000, 1) as minutos,
  ult.respondidas,
  ult.question_id as ultima_pergunta,
  (e.data ->> 'bestChoices')::int as boas_escolhas,
  r.estrelas,
  r.comentario
from metricas.eventos s
left join lateral (
  select * from metricas.eventos x where x.type = 'end' and x.session_id = s.session_id order by x.id limit 1
) e on true
left join lateral (
  select
    x.question_id,
    (x.data ->> 'round')::int as rodada,
    x.data ->> 'band' as faixa,
    (x.data ->> 'pop')::int as pop,
    (x.data ->> 't')::numeric as t,
    count(*) over () as respondidas
  from metricas.eventos x
  where x.type = 'answer' and x.session_id = s.session_id
  order by (x.data ->> 'round')::int desc
  limit 1
) ult on true
left join lateral (
  select (x.data ->> 'stars')::int as estrelas, nullif(trim(x.data ->> 'comment'), '') as comentario
  from metricas.eventos x where x.type = 'rating' and x.session_id = s.session_id order by x.id desc limit 1
) r on true
where s.type = 'start';

create or replace view metricas.resumo as
with p as (select * from metricas.partidas where final <> 'jogando'),
jog as (select player_id, count(*) as n from metricas.partidas group by player_id)
select
  (select count(*) from metricas.partidas) as partidas,
  (select count(*) from metricas.partidas where final = 'jogando') as jogando_agora,
  round(100.0 * count(*) filter (where final in ('sobreviveu', 'extinto')) / nullif(count(*), 0), 1) as pct_terminou,
  round(100.0 * count(*) filter (where final = 'sobreviveu') / nullif(count(*), 0), 1) as pct_sobreviveu,
  round(100.0 * count(*) filter (where final = 'extinto') / nullif(count(*), 0), 1) as pct_extinto,
  round(100.0 * count(*) filter (where final = 'abandonou') / nullif(count(*), 0), 1) as pct_abandonou,
  percentile_cont(0.5) within group (order by minutos) filter (where final = 'sobreviveu') as minutos_mediana_quem_sobreviveu,
  percentile_cont(0.5) within group (order by minutos) as minutos_mediana_geral,
  (select count(*) from jog) as jogadores,
  (select round(100.0 * count(*) filter (where n >= 2) / nullif(count(*), 0), 1) from jog) as pct_jogou_de_novo,
  round(avg(estrelas), 2) as nota_media,
  count(estrelas) as avaliacoes
from p;

create or replace view metricas.finais as
select
  final,
  case when final = 'sobreviveu' then 'faixa ' || faixa else 'rodada ' || rodada end as detalhe,
  count(*) as partidas,
  round(100.0 * count(*) / sum(count(*)) over (), 1) as pct
from metricas.partidas
where final <> 'jogando'
group by 1, 2
order by 1, 3 desc;

create or replace view metricas.perguntas as
with a as (select * from metricas.eventos where type = 'answer')
select
  a.question_id as pergunta,
  min(a.data ->> 'category') as categoria,
  min(a.data ->> 'scenario') as inicio_do_texto,
  count(*) as respostas,
  round(100.0 * avg(((a.data ->> 'chosenBest')::boolean)::int), 1) as pct_acerto,
  round((percentile_cont(0.5) within group (order by (a.data ->> 'decisionMs')::numeric) / 1000)::numeric, 1) as seg_decidindo,
  round((percentile_cont(0.5) within group (order by (a.data ->> 'readMs')::numeric) / 1000)::numeric, 1) as seg_lendo_explicacao,
  count(*) filter (where p.final = 'abandonou' and p.ultima_pergunta = a.question_id) as desistiu_depois,
  round(100.0 * count(*) filter (where p.final = 'abandonou' and p.ultima_pergunta = a.question_id) / count(*), 1) as pct_desistiu_depois
from a join metricas.partidas p using (session_id)
group by a.question_id
order by pct_desistiu_depois desc, pct_acerto desc;

create or replace view metricas.avaliacoes as
select
  coalesce(final, 'todas') as final,
  count(*) as avaliacoes,
  round(avg(estrelas), 2) as nota_media,
  count(*) filter (where estrelas = 5) as "5★",
  count(*) filter (where estrelas = 4) as "4★",
  count(*) filter (where estrelas = 3) as "3★",
  count(*) filter (where estrelas = 2) as "2★",
  count(*) filter (where estrelas = 1) as "1★"
from metricas.partidas
where estrelas is not null
group by rollup (final)
order by grouping(final) desc, 1;

create or replace view metricas.comentarios as
select inicio, estrelas, final, faixa, comentario
from metricas.partidas
where comentario is not null
order by inicio desc;
