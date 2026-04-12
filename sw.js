self.addEventListener('install', (e) => {
  console.log('SW установлен');
});
self.addEventListener('fetch', (e) => {
  return; 
});
