var CACHE_NAME = 'latihan-pwa-cache-v1';

var urlToCache = [
    '/',
    '/css/main.css',
    '/css/all.css',
    '/css/bootstrap.min.css',   
    '/images/pistel.jpg',
    '/manifest.json',
    '/js/all.js',
    '/js/bootstrap.js',
    '/js/jquery.min.js',
    '/manifest.json',
    '/js/main.js'
];

//install service worker
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
                console.log('service worker do install..',cache);
                return cache.addAll(urlToCache);
            })
    );
});

//aktivasi cache
self.addEventListener('activate',function(event){
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                //delete cache jika da versi yang lebih baru
                cacheName.filter(function(cacheName){
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//fetch cache
self.addEventListener('fetch',function(event){
    var request = event.request;
    var url = new URL(request.url);

    //memisahkan cache file degan cache data API
    if(url.origin === location.origin){
        event.respondWith(
            caches.match(request).then(function(response){
                return response || fetch(request);
            })
        )
    } else {
        event.respondWith(
            caches.open('list-mahasiswa-cache-v1')
            .then(function(cache){
                return fetch(request).then(function(liveRequest){
                    cache.put(request,liveRequest.clone());
                    return liveRequest;
                }).catch(function(){
                    return caches.match(request)
                    .then(function(response){
                        if(response) return response;
                        return caches.match('fallback.json');
                    })
                })
            })
        )
    }
    // event.respondWith(
    //     caches.match(event.request)
    //     .then(function(response){
    //         console.log(response);
    //     if(response){
    //         return response;
    //     }
    //         return fetch(event.request);
    // })
    // )
});

if(navigator.serviceWorker){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/serviceworker.js').then(function(reg){
            console.log('SW regis sukses dgn skop', reg.scope);
        }, function(err){
            console.log("SW regis failed", err);
        });
    });
}

self.addEventListener('notificationclick', function (e){
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    console.log(primaryKey);

    if(action=== 'close'){
        notification.close();

    }else{
        clients.openWindow('http://google.com');
        notification.close();
    }
});