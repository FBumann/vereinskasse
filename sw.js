// @ts-check
/* eslint-env serviceworker */

// Must match APP_VERSION in index.html.
const VERSION = '27';
const ASSETS = ['./', './index.html'];

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));
const SCOPE = sw.registration.scope;

// Cache names include the scope so the root app and the archived
// versions/vN/ apps never delete each other's files.
/** @param {string} v */
const cacheName = v => `vereinskasse-v${v} ${SCOPE}`;
const CACHE = cacheName(VERSION);

// Pinning: the browser installs every new sw.js it sees, but the app keeps
// serving the *pinned* version until the user taps "Aktualisieren" in the
// Menü tab. The page reads `latest` and writes `pinned` (see index.html).
const META = 'vereinskasse-meta';
/** @param {'pinned' | 'latest'} key */
async function readMeta(key) {
  const res = await caches.match(SCOPE + '__' + key, { cacheName: META });
  return res ? res.text() : null;
}
/** @param {'pinned' | 'latest'} key @param {string} value */
async function writeMeta(key, value) {
  await (await caches.open(META)).put(SCOPE + '__' + key, new Response(value));
}

sw.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Bypass the HTTP cache so we never store a stale index.html.
    await cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })));
    // First install (or upgrade from a version without pinning): use this version.
    if (!(await readMeta('pinned'))) await writeMeta('pinned', VERSION);
    await writeMeta('latest', VERSION);
    await sw.skipWaiting();
  })());
});

sw.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const pinned = await readMeta('pinned');
    const keep = new Set([CACHE, pinned && cacheName(pinned)]);
    const stale = (await caches.keys()).filter(k =>
      (k.endsWith(' ' + SCOPE) && !keep.has(k)) ||
      /^vereinskasse-v\d+$/.test(k)); // pre-pinning cache names
    await Promise.all(stale.map(k => caches.delete(k)));
    await sw.clients.claim();
  })());
});

// Serve from the pinned version's cache, falling back to this version's
// cache and finally the network.
sw.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const pinned = await readMeta('pinned');
    for (const name of [pinned && cacheName(pinned), CACHE]) {
      if (!name) continue;
      const hit = await caches.match(e.request, { cacheName: name });
      if (hit) return hit;
    }
    return fetch(e.request);
  })());
});
