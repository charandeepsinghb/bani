const CACHE_NAME = 'bani-pwa-cache-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/list.html',
  '/japji-sahib.html',
  '/japji-sahib-para.html',
  '/sukhmani-sahib.html',
  '/sukhmani-sahib-para.html',
  '/styles/style.css',
  '/styles/bani-styles.css',
  '/styles/toasts.css',
  '/components/floating-button/floating-button.css',
  '/components/floating-button/floating-button.html',
  '/components/menu/menu.css',
  '/components/menu/menu.html',
  '/dist/main.js',
  '/assets/ba.svg',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/manifest.webmanifest',
  '/offline.html'
];

// Cache Google Fonts
const GOOGLE_FONTS_CACHE = 'google-fonts';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME && key !== GOOGLE_FONTS_CACHE) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts caching
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(GOOGLE_FONTS_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          return (
            response ||
            fetch(event.request).then(fetchRes => {
              cache.put(event.request, fetchRes.clone());
              return fetchRes;
            })
          );
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        })
      );
    })
  );
});
