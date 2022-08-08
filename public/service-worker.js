
const version = '0.01'
const resources = [
    '/',
    '/index.html',
    '/global.css',
    '/favicon.png',
    '/init.js',
    '/service-worker.js',
    '/build/bundle.css',
    '/build/bundle.js',
    '/build/bundle.js.map',
    '/halfmoon/css/halfmoon.min.css',
    '/halfmoon/js/halfmoon.min.js',
    '/halfmoon/icons/remixicon.css',
    '/halfmoon/icons/remixicon.eot',
    '/halfmoon/icons/remixicon.svg',
    '/halfmoon/icons/remixicon.ttf',
    '/halfmoon/icons/remixicon.symbol.svg',
    '/halfmoon/icons/remixicon.woff',
    '/halfmoon/icons/remixicon.woff2',
    '/data.db',
    '/manifest/manifest.json'
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
                    cache.put(event.request, response.clone())
                    return response;
                })
            })
        })
    )
})



