const CACHE_NAME = "harry-potter-story-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.webmanifest",
  "/images/logo.png",
  "/favicon.png"
  // Tambahkan file statis lain yang ingin di-cache
];

// Install SW dan cache file statis
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch: cache first, fallback ke network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const req = event.request;

  event.respondWith(
    fetch(req).catch(async () => {
      const cachedResponse = await caches.match(req);

      // If not found, and this is navigation request (HTML), return /
      if (!cachedResponse && req.mode === 'navigate') {
        return caches.match('/');
      }

      return cachedResponse || Response.error();
    })
  );
});

// Activate: hapus cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});

self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notifikasi Baru!";
  const options = {
    body: data.body || "Ada update baru di Harry Potter Story.",
    icon: "/images/logo.png"
  };
  event.waitUntil(self.registration.showNotification(title, options));
});