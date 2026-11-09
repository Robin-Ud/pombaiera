"use strict";

// Métricas anônimas: o jogo anota o que acontece em cada partida e manda em lotes para o Supabase.
// Nada pessoal: só um id aleatório por aparelho. As anotações ficam numa fila no aparelho até
// serem enviadas, então jogar sem internet não perde nada. Qualquer falha aqui é ignorada: o jogo segue.
// Como configurar: metricas/LEIA-ME.md.
const Metrics = (() => {
  // Supabase → Project Settings → API: "Project URL" e a chave pública ("anon" ou "publishable").
  const SUPABASE_URL = "https://mrikgmovjiboencrwqci.supabase.co";
  const SUPABASE_KEY = "sb_publishable_kv1bo9f3hcfjLCF3_Vs0_g_zEvHpOTP";

  const VERSION = 9;
  const QUEUE_KEY = "jogo-do-pombo-fila";
  const PLAYER_KEY = "jogo-do-pombo-jogador";
  const TESTER_KEY = "jogo-do-pombo-teste";
  const MAX_QUEUE = 1000;
  const BATCH = 100;

  const params = new URLSearchParams(location.search);
  // Partidas de teste (?auto, ?seed, ?debug) não entram nas estatísticas.
  const enabled = !!(SUPABASE_URL && SUPABASE_KEY) && !["auto", "seed", "debug"].some((p) => params.has(p));

  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }

  function get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* sem armazenamento */ }
  }
  // A fila é sempre relida do armazenamento: duas abas abertas não apagam o que a outra anotou.
  function loadQueue() {
    try { return JSON.parse(get(QUEUE_KEY)) || []; } catch { return []; }
  }
  function saveQueue(queue) {
    set(QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE)));
  }

  // Aparelho de teste: abra uma vez com ?teste e tudo dele vai marcado ("test": true), chega no banco
  // mas fica fora dos relatórios. ?teste=0 desmarca. Diferente de ?debug, que nem manda nada.
  if (params.has("teste")) {
    if (params.get("teste") === "0") {
      try { localStorage.removeItem(TESTER_KEY); } catch { /* ok */ }
    } else {
      set(TESTER_KEY, "1");
    }
  }
  const tester = get(TESTER_KEY) === "1";

  let playerId = get(PLAYER_KEY);
  if (!playerId) {
    playerId = uuid();
    set(PLAYER_KEY, playerId);
  }
  let sessionId = null;
  let sending = false;
  let again = false; // pediram outro envio enquanto um estava em andamento

  function track(type, questionId, data) {
    if (!enabled || !sessionId) return;
    try {
      const queue = loadQueue();
      queue.push({ uid: uuid(), session_id: sessionId, player_id: playerId, type, question_id: questionId ?? null, data: tester ? { ...data, test: true } : data ?? {} });
      saveQueue(queue);
    } catch { /* ok */ }
  }

  function start(data) {
    if (!enabled) return;
    sessionId = uuid();
    track("start", null, { ...data, version: VERSION });
    flush();
  }

  async function flush() {
    if (sending) { again = true; return; }
    if (!enabled || navigator.onLine === false) return;
    const batch = loadQueue().slice(0, BATCH);
    if (!batch.length) return;
    sending = true;
    try {
      const res = await fetch(SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/events", {
        method: "POST",
        keepalive: true,
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify(batch),
      });
      // Dados recusados (formato inválido): tentar de novo não adianta, então descarta.
      // Erro de configuração (chave/endereço) ou servidor fora do ar: guarda para tentar depois.
      if (res.ok || [400, 409, 413, 422].includes(res.status)) {
        if (!res.ok) console.warn("Métricas recusadas:", res.status, await res.text().catch(() => ""));
        const sent = new Set(batch.map((e) => e.uid));
        saveQueue(loadQueue().filter((e) => !sent.has(e.uid)));
      }
    } catch { /* sem internet: fica na fila */ }
    sending = false;
    if (again) { again = false; flush(); }
  }

  // Selo no canto para não esquecer que este aparelho não conta.
  if (enabled && tester) {
    addEventListener("DOMContentLoaded", () => {
      const selo = document.createElement("div");
      selo.textContent = "🧪 teste";
      selo.title = "Partidas deste aparelho não entram nas métricas. Abra com ?teste=0 para desmarcar.";
      selo.style.cssText = "position:fixed;top:8px;right:8px;z-index:99;padding:2px 10px;border-radius:99px;"
        + "background:#e9b949;color:#16292e;font-size:.8rem;font-weight:600;pointer-events:none";
      document.body.appendChild(selo);
    });
  }

  if (enabled) {
    addEventListener("online", flush);
    addEventListener("pagehide", flush);
    flush(); // sobras de partidas anteriores
  }

  return { enabled, tester, start, track, flush };
})();
