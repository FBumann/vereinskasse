// @ts-check
/* eslint-env serviceworker */

const CACHE = 'vereinskasse-v28';
const ASSETS = ['./', './index.html'];

self.addEventListener('install', /** @param {ExtendableEvent} e */ e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self)).skipWaiting())
  );
});

self.addEventListener('activate', /** @param {ExtendableEvent} e */ e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self)).clients.claim())
  );
});

// Cache-only: always serve from cache. Never re-fetches once installed,
// so the app stays on exactly the version it was installed with. To get
// a new version, the user reinstalls from Safari (see README).
self.addEventListener('fetch', /** @param {FetchEvent} e */ e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
