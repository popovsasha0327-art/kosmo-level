const CACHE_NAME = 'lmsh-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

// Установка и кэширование
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// Работа в офлайне
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
