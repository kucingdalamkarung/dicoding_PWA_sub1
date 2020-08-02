const CACHE_NAME = "bookstore";
var urlsToCache = [
  "/",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/css/materialize.min.css",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/books.html",
  "/pages/contact.html",
  "/nav.html",
  "/index.html",
  "/images/best_seller/1.jpg",
  "/images/best_seller/2.jpg",
  "/images/best_seller/3.jpg",
  "/images/best_seller/4.jpg",
  "/images/it/1.jpg",
  "/images/it/2.jpg",
  "/images/it/3.jpg",
  "/images/icons/icon.png",
  "/manifest.json",
  "/service-worker.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});
