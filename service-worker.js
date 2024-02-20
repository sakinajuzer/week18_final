var cacheName = "petstore-v1";
var cacheFile = [
    "index.html",
    "products.js",
    "Pet_depot.css",
    "Pet_depot.webmanifest",
    "images/catfood.jpeg",
    "images/catfood2.png",
    "images/catfood3.png",
    "images/kittyfood.png",
    "images/icon-store-512.png",
    "images/icon-store-32.png"
];

// what is self 
// what is cache
// where is service worker actually doing installation ofncache files ans it will happen only after waituntil
// what isn the keyword that actually helpsmto push all files  
// what is service worker 
// addall helps to get all files to 

self.addEventListener("install", (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFile);
        })
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fecthing Resource: ' + e.request.url);
//             // r is matching file if it exists in the cache 
//             return r
//         })
//     );
// });


// sometimes manifest may act weirdly and will not give the install option in chrome that time, use mozilla firefox in phone then it will give that option
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fecthing Resource: ' + e.request.url);
            // r is matching file if it exists in the cache 
            return r || fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});