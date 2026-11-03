// Unica costante da cambiare a ogni rilascio: rinomina la cache e fa comparire l'avviso "Nuova versione"
var VERSION = "10";
var CACHE = "snake-v" + VERSION;
var CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "privacy.html"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(CORE.map(function (u) { return new Request(u, { cache: "reload" }); }));
  }).then(function () {
    // prima installazione: attiva subito; aggiornamento: aspetta il via dalla pagina, che avvisa il giocatore
    if (!self.registration.active) return self.skipWaiting();
  }));
});
self.addEventListener("message", function (e) { if (e.data === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("snake-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(e.request, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        if (res && (res.status === 200 || res.type === "opaque")) cache.put(e.request, res.clone());
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    });
  }));
});
