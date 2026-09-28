"use strict";

// ================= Regras (portadas de jogo_pombo.py) =================

const BANDS = [
  { name: "ninho", min_pop: 0, K: 15, good_mult: 1.30, bad_mult: 0.80, tier_center: 1.5 },
  { name: "bando", min_pop: 20, K: 45, good_mult: 1.15, bad_mult: 1.10, tier_center: 4.0 },
  { name: "colônia", min_pop: 60, K: 110, good_mult: 1.00, bad_mult: 1.40, tier_center: 6.5 },
  { name: "metrópole", min_pop: 150, K: 220, good_mult: 0.90, bad_mult: 1.80, tier_center: 8.5 },
];

const MIN_GAP = 3;
const START_POP = 5;

const BAND_FINAL_MESSAGE = {
  "ninho": "Seu bando mal saiu do ninho, mas sobreviveu — um começo frágil e valioso.",
  "bando": "Seu bando cresceu e se firmou como uma presença de peso na praça.",
  "colônia": "Sua colônia domina os telhados do bairro inteiro!",
  "metrópole": "Seu bando virou uma verdadeira metrópole de pombos, espalhada pela cidade!",
};

// Chance de a escolha dar certo: a melhor resposta costuma funcionar, a pior costuma falhar.
const P_SUCCESS = { gain: 0.75, loss: 0.25 };
const WISE_BONUS = 0.15;
// Escolha certa que dá errado perde menos; escolha errada que dá certo ganha menos.
const SOFTEN = 0.5;
const EGG_CHANCE = 0.35;

// round() do Python arredonda .5 para o par mais próximo
function pyRound(x) {
  const f = Math.floor(x);
  const d = x - f;
  if (d === 0.5) return f % 2 === 0 ? f : f + 1;
  return d > 0.5 ? f + 1 : f;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function getBand(pop) {
  let current = BANDS[0];
  for (const band of BANDS) if (pop >= band.min_pop) current = band;
  return current;
}

function computeWvar(pop) {
  return Math.max(1, pyRound(pop * 0.25));
}

// Bando grande: ganho amortecido pela densidade e perda aumentada pela pressão (e vice-versa).
function computeEffect(pop, effect, band) {
  const w = computeWvar(pop);
  const densityRatio = pop / band.K;
  if (effect === "gain") {
    const dampening = clamp(1 - densityRatio * 0.5, 0.4, 1.0);
    return Math.max(1, pyRound(w * band.good_mult * dampening));
  }
  const pressure = clamp(0.5 + densityRatio * 0.7, 0.5, 2.0);
  return -Math.max(1, pyRound(w * band.bad_mult * pressure));
}

function selectNext(questions, pool, roundIdx, lastRound, band, rng) {
  const last = (i) => lastRound[questions[i].category] ?? -999;
  let eligible = pool.filter((i) => last(i) <= roundIdx - MIN_GAP);
  if (!eligible.length) {
    const oldest = Math.min(...pool.map(last));
    eligible = pool.filter((i) => last(i) === oldest);
  }
  const weights = eligible.map((i) => Math.max(0.05, 1 - Math.abs(questions[i].tier - band.tier_center) / 4));
  const chosen = eligible[weightedIndex(weights, rng)];
  pool.splice(pool.indexOf(chosen), 1);
  lastRound[questions[chosen].category] = roundIdx;
  return chosen;
}

function weightedIndex(weights, rng) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r < 0) return i;
  }
  return weights.length - 1;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ================= Sequência, sorte e ovo surpresa =================

function comboMult(streak) {
  if (streak >= 3) return 2;
  if (streak >= 2) return 1.5;
  return 1;
}

// Perguntas de conceito têm resultado certo; só as que têm "risco" dependem do acaso.
// A população define o tamanho do resultado.
function resolveRound(state, question, option, rng) {
  const band = getBand(state.pop);
  const chosenBest = option.effect === "gain";
  const risky = !!question.risco;
  let success = chosenBest;
  if (risky) {
    let p = P_SUCCESS[option.effect];
    if (state.buffs.wise) p = Math.min(0.95, p + WISE_BONUS);
    success = rng() < p;
  }

  const streak = chosenBest ? state.streak + 1 : 0;
  let delta;
  if (success) {
    const base = computeEffect(state.pop, "gain", band);
    const mult = comboMult(streak) * (state.buffs.double ? 2 : 1) * (chosenBest ? 1 : SOFTEN);
    delta = Math.max(1, pyRound(base * mult));
  } else {
    const base = -computeEffect(state.pop, "loss", band);
    const mult = (state.buffs.shield ? 0.5 : 1) * (chosenBest ? SOFTEN : 1);
    delta = -Math.max(1, pyRound(base * mult));
  }

  const used = { wise: risky && state.buffs.wise, double: success && state.buffs.double, shield: !success && state.buffs.shield };
  return { success, chosenBest, risky, delta, streak, used };
}

const PRIZES = [
  { id: "brood", weight: 40 },
  { id: "shield", weight: 25 },
  { id: "double", weight: 20 },
  { id: "wise", weight: 15 },
];

function prizeText(prize, amount) {
  switch (prize.id) {
    case "brood": return `🐣 Ninhada extra! +${amount} pombos`;
    case "shield": return "🛡️ Abrigo reforçado: o próximo tropeço dói pela metade";
    case "double": return "🌽 Despensa cheia: o próximo crescimento vale o dobro";
    case "wise": return "🦉 Conselho do pombo velho: a próxima decisão tem mais chance de dar certo";
  }
}

if (typeof module !== "undefined") {
  module.exports = { BANDS, getBand, computeEffect, pyRound, selectNext, mulberry32, resolveRound, comboMult };
}

// ================= Interface =================

if (typeof document !== "undefined") {
  const params = new URLSearchParams(location.search);
  const AUTO = params.get("auto");
  const DEBUG = params.has("debug");
  const SEED = params.get("seed");
  const FAST = !!AUTO;
  const rng = SEED !== null ? mulberry32(Number(SEED)) : Math.random;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const wait = (ms) => new Promise((r) => setTimeout(r, FAST ? 0 : ms));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  let QUESTIONS = [];
  let state;
  let current = null;

  // ---------- armazenamento ----------
  const STORE_KEY = "jogo-do-pombo";
  function loadRecord() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
  }
  function saveRecord(rec) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(rec)); } catch { /* sem armazenamento */ }
  }

  // ---------- som ----------
  let audio = null;
  let muted = (() => { try { return localStorage.getItem(STORE_KEY + "-mute") === "1"; } catch { return false; } })();
  function tone(freq, dur, vol = 0.06, delay = 0) {
    if (muted || FAST) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const t = audio.currentTime + delay;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + dur);
    } catch { /* sem áudio */ }
  }
  const sfx = {
    good: () => [523, 659, 784].forEach((f, i) => tone(f, 0.18, 0.07, i * 0.08)),
    bad: () => [392, 330].forEach((f, i) => tone(f, 0.22, 0.06, i * 0.12)),
    level: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 0.08, i * 0.1)),
  };

  // ---------- telas ----------
  function show(id) {
    $$(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    scrollTo(0, 0);
  }

  function renderStart() {
    const rec = loadRecord();
    $("#record").textContent = rec.best ? `Recorde: ${rec.best} pombos (${cap(rec.bestBand)})` : "";
    show("screen-start");
  }

  function newGame() {
    state = {
      pop: START_POP, round: 0, rounds: QUESTIONS.length,
      pool: QUESTIONS.map((_, i) => i), lastRound: {},
      streak: 0, maxStreak: 0, bestChoices: 0, bandIdx: 0,
      buffs: { shield: false, double: false, wise: false },
    };
    show("screen-game");
    $("#pop-count").textContent = state.pop;
    nextRound();
  }

  // ---------- HUD ----------
  function renderHud() {
    const band = getBand(state.pop);
    const next = BANDS[BANDS.indexOf(band) + 1];
    $("#band-name").textContent = cap(band.name);
    if (next) {
      const pct = ((state.pop - band.min_pop) / (next.min_pop - band.min_pop)) * 100;
      $("#band-bar").style.width = clamp(pct, 0, 100) + "%";
      $("#band-next").textContent = `faltam ${next.min_pop - state.pop} p/ ${cap(next.name)}`;
    } else {
      $("#band-bar").style.width = "100%";
      $("#band-next").textContent = "faixa máxima";
    }
    $("#round-label").textContent = `Rodada ${state.round}/${state.rounds}`;

    $("#combo-pips").innerHTML = [1, 2, 3].map((i) => `<span class="pip${state.streak >= i ? " on" : ""}"></span>`).join("");
    const m = comboMult(state.streak);
    $("#combo-mult").textContent = m > 1 ? `crescimento ×${m}` : "";

    const buffs = [];
    if (state.buffs.shield) buffs.push("🛡️");
    if (state.buffs.double) buffs.push("🌽");
    if (state.buffs.wise) buffs.push("🦉");
    $("#buffs").innerHTML = buffs.map((b) => `<span class="buff">${b}</span>`).join("");
  }

  function setPop(value) {
    $("#pop-count").textContent = value;
  }

  function flashDelta(delta) {
    const el = $("#pop-delta");
    el.textContent = (delta > 0 ? "+" : "") + delta;
    el.className = "pop-delta " + (delta > 0 ? "win" : "lose");
  }

  // ---------- rodada ----------
  function nextRound() {
    state.round += 1;
    if (state.round > state.rounds) return endGame(true);

    const band = getBand(state.pop);
    current = QUESTIONS[selectNext(QUESTIONS, state.pool, state.round, state.lastRound, band, rng)];
    if (DEBUG) console.log(`[round ${state.round} | pop=${state.pop} | band=${band.name} | categoria=${current.category} | tier=${current.tier}]`);

    $("#category").textContent = current.category;
    $("#scenario").textContent = current.scenario;
    for (const btn of $$(".option")) {
      btn.querySelector(".opt-label").textContent = current["option_" + btn.dataset.opt].label;
      btn.disabled = false;
      btn.className = "option";
    }
    $("#suspense").classList.add("hidden");
    $("#result").classList.add("hidden");
    renderHud();

    if (AUTO) {
      const target = AUTO === "best" ? "gain" : "loss";
      choose(current.option_a.effect === target ? "a" : "b");
    }
  }

  async function choose(letter) {
    const option = current["option_" + letter];
    $$(".option").forEach((b) => { b.disabled = true; if (b.dataset.opt === letter) b.classList.add("picked"); });

    const res = resolveRound(state, current, option, rng);
    $("#suspense").classList.remove("hidden");
    await wait(800);
    $("#suspense").classList.add("hidden");
    await reveal(letter, option, res);
  }

  async function reveal(letter, option, res) {
    state.pop = Math.max(0, state.pop + res.delta);
    state.streak = res.streak;
    state.maxStreak = Math.max(state.maxStreak, state.streak);
    if (res.chosenBest) state.bestChoices += 1;
    for (const k of Object.keys(res.used)) if (res.used[k]) state.buffs[k] = false;

    for (const btn of $$(".option")) {
      if (current["option_" + btn.dataset.opt].effect !== "gain") continue;
      btn.classList.add("best");
      const tag = res.risky ? "Melhor escolha: costuma dar certo" : "Melhor escolha";
      btn.querySelector(".opt-label").insertAdjacentHTML("beforeend", `<span class="tag">${tag}</span>`);
    }

    const banner = $("#result-banner");
    banner.className = "result-banner " + (res.success ? "win" : "lose");
    banner.textContent = res.success ? `O bando prosperou! +${res.delta}` : `O bando sofreu ${res.delta}`;

    let text;
    if (res.chosenBest && res.success) text = "Boa escolha!";
    else if (res.chosenBest) text = `Boa escolha, mas deu azar. ${current.risco.azar} A sequência continua.`;
    else if (res.success) text = `Deu sorte! ${current.risco.sorte} Mas essa escolha costuma dar errado.`;
    else text = "Essa não foi a melhor escolha. A certa está marcada em verde.";
    $("#result-odds").textContent = text;

    const showNote = option.note && ((option.effect === "gain") === res.success);
    $("#result-note").textContent = showNote ? `(${option.note})` : "";
    $("#result-note").classList.toggle("hidden", !showNote);

    $("#feedback").innerHTML = "";
    current.feedback.forEach((line) => {
      const b = document.createElement("div");
      b.className = "bubble";
      b.textContent = line;
      $("#feedback").appendChild(b);
    });
    $("#result").classList.remove("hidden");

    (res.success ? sfx.good : sfx.bad)();
    flashDelta(res.delta);
    setPop(state.pop);
    renderHud();
    if (DEBUG) console.log(`  escolha=${letter} melhor=${res.chosenBest} sucesso=${res.success} delta=${res.delta} pop=${state.pop}`);

    if (state.pop > 0 && res.chosenBest && rng() < EGG_CHANCE) {
      await wait(700);
      await openEgg();
    }
    await checkLevel();
    if (AUTO) onNext();
  }

  function onNext() {
    if (state.pop <= 0) return endGame(false);
    nextRound();
  }

  // ---------- ovo surpresa ----------
  async function openEgg() {
    const prize = PRIZES[weightedIndex(PRIZES.map((p) => p.weight), rng)];
    const amount = Math.max(2, pyRound(state.pop * 0.15));
    const egg = $("#egg");
    egg.textContent = "🥚";
    $("#prize-text").textContent = "Sua boa escolha trouxe um presente…";
    $("#btn-egg-ok").classList.add("hidden");
    $("#modal-egg").classList.remove("hidden");

    await wait(1200);
    egg.textContent = "🐣";
    $("#prize-text").textContent = prizeText(prize, amount);
    sfx.good();

    if (!AUTO) {
      await new Promise((resolve) => {
        const btn = $("#btn-egg-ok");
        btn.classList.remove("hidden");
        btn.onclick = resolve;
      });
    }
    $("#modal-egg").classList.add("hidden");

    if (prize.id === "brood") {
      state.pop += amount;
      flashDelta(amount);
      setPop(state.pop);
    } else {
      state.buffs[prize.id] = true;
    }
    renderHud();
  }

  // ---------- subida de faixa ----------
  async function checkLevel() {
    const idx = BANDS.indexOf(getBand(state.pop));
    const up = idx > state.bandIdx;
    state.bandIdx = idx;
    if (!up || AUTO) return;

    const band = BANDS[idx];
    $("#level-name").textContent = band.name;
    $("#level-msg").textContent = BAND_FINAL_MESSAGE[band.name];
    $("#modal-level").classList.remove("hidden");
    sfx.level();
    await new Promise((resolve) => ($("#btn-level-ok").onclick = resolve));
    $("#modal-level").classList.add("hidden");
  }

  // ---------- fim ----------
  function endGame(survived) {
    const band = getBand(state.pop);
    const played = survived ? state.rounds : state.round;
    const rec = loadRecord();
    const newRecord = survived && state.pop > (rec.best || 0);
    if (newRecord) saveRecord({ best: state.pop, bestBand: band.name });

    $("#end-title").textContent = survived
      ? (newRecord ? `Novo recorde: ${state.pop} pombos!` : `${state.pop} pombos`)
      : "O bando desapareceu";
    $("#end-msg").textContent = survived
      ? BAND_FINAL_MESSAGE[band.name]
      : `Seu bando não resistiu na rodada ${state.round}.`;
    $("#stats").innerHTML = `
      <div class="stat"><b>${state.bestChoices}/${played}</b><span>boas escolhas</span></div>
      <div class="stat"><b>${state.maxStreak}</b><span>maior sequência</span></div>`;

    show("screen-end");
    if (DEBUG) console.log(`FIM survived=${survived} pop=${state.pop} band=${band.name}`);
  }

  // ---------- eventos ----------
  $("#btn-start").onclick = newGame;
  $("#btn-again").onclick = newGame;
  $("#btn-next").onclick = onNext;
  $$(".option").forEach((b) => (b.onclick = () => choose(b.dataset.opt)));
  const muteBtn = $("#btn-mute");
  muteBtn.textContent = muted ? "🔇" : "🔊";
  muteBtn.onclick = () => {
    muted = !muted;
    muteBtn.textContent = muted ? "🔇" : "🔊";
    try { localStorage.setItem(STORE_KEY + "-mute", muted ? "1" : "0"); } catch { /* ok */ }
  };

  // perguntas.js (gerado por gerar_perguntas_js.py) funciona até abrindo o arquivo direto;
  // o fetch fica de reserva caso ele não exista.
  const startBtn = $("#btn-start");
  startBtn.disabled = true;
  const loadQuestions = window.PERGUNTAS
    ? Promise.resolve(window.PERGUNTAS)
    : fetch("../perguntas.json").then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });

  loadQuestions
    .then((data) => {
      const order = data.category_order;
      QUESTIONS = data.questions.map((q) => ({ ...q, tier: q.tier ?? order.indexOf(q.category) }));
      startBtn.disabled = false;
      if (AUTO) newGame(); else renderStart();
    })
    .catch((err) => {
      console.error("Falha ao carregar as perguntas:", err);
      renderStart();
      $("#record").textContent = "Não achei as perguntas. Rode `python3 gerar_perguntas_js.py` na pasta do projeto e abra web/index.html de novo.";
    });
}
