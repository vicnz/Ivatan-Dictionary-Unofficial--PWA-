
const version = '0.02'
const resources = [
    '/',
    '/index.html',
    '/global.css',
    '/favicon.png',
    '/service-worker.js',
    '/build/bundle.css',
    '/build/bundle.js',
    '/build/bundle.js.map',
    '/halfmoon/css/halfmoon.min.css',
    '/halfmoon/js/halfmoon.min.js',
    '/halfmoon/icons/remixicon.css',
    '/manifest/manifest.json',
    '/scripts/init.js',
    '/scripts/sql-wasm.js',
    '/scripts/sql-wasm.wasm',
    '/scripts/localforage.min.js',
    '/data.db',
    '/words.json',
    '/halfmoon/icons/remixicon.woff2?t=1590207869815',
    '/halfmoon/icons/remixicon.ttf?t=1590207869815',
    '/halfmoon/icons/remixicon.woff?t=1590207869815',
    '/fallback.html'
]

self.addEventListener('install', async (event) => {
    console.log('installing Service Worker....')
    event.waitUntil(
        caches.open(version).then(cache => {
            return cache.addAll(resources)
        })
    )
    self.skipWaiting()
})

self.addEventListener('activate', async (event) => {
    console.log('Activating...')
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.filter(key => key.indexOf(version) !== 0).map(key => caches.delete(key)))
        })
    )
    self.skipWaiting()
})

self.addEventListener('fetch', async (event) => {
    event.respondWith(
        caches.open(version).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(response => {
                    if (!event.request.url.match('.*[\/bookmarks, \/search\/].*')) {
                        cache.put(event.request, response.clone())
                    }
                    return response;
                })
            }).catch(err => {
                return cache.match('/fallback.html').then(response => {
                    return response || fetch('/fallback.html').then(res => {
                        return res;
                    })
                })
            })
        })
    )
})



