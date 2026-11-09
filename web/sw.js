// Guarda o jogo no aparelho para abrir sem internet.
// Responde do cache e atualiza em segundo plano. Quando sai versão nova (CACHE muda), o service worker
// novo assume e recarrega as abas abertas: quem abriu com a versão velha já cai na nova, sem abrir de novo.
const CACHE = "pombo-v7";
const FILES = [
  "./",
  "index.html",
  "style.css?v=11",
  "metrics.js?v=11",
  "game.js?v=11",
  "perguntas.js?v=11",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "img/pombo.webp",
  "img/parque.webp",
  "img/bem-te-vi.webp",
];

self.addEventListener("install", (e) => {
  // cache: "reload" pula o cache HTTP do navegador, senão a versão nova podia nascer com arquivo velho.
  const pedidos = FILES.map((f) => new Request(f, { cache: "reload" }));
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(pedidos)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    // Só os caches do jogo: o álbum e outros projetos moram no mesmo robin-ud.github.io.
    const velhos = (await caches.keys()).filter((k) => k.startsWith("pombo-") && k !== CACHE);
    await Promise.all(velhos.map((k) => caches.delete(k)));
    await self.clients.claim();
    // Só recarrega se havia versão anterior: na primeira visita a página já veio da rede.
    if (!velhos.length) return;
    const abas = await self.clients.matchAll({ type: "window" });
    await Promise.all(abas.map((aba) => aba.navigate(aba.url).catch(() => {})));
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const fresh = fetch(req)
        .then((res) => { if (res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => cached || Response.error());
      if (cached) {
        e.waitUntil(fresh);
        return cached;
      }
      return fresh;
    })
  );
});
