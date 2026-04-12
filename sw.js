self.addEventListener('install', (e) => {
  console.log('Service Worker установлен');
});

self.addEventListener('fetch', (e) => {
  // Позволяет приложению открываться
});
