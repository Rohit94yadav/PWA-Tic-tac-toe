let cacheData = "appv1";
let assets = [
    
    "/static/js/bundle.js",
    "/index.html",
    "/",
    "/manifest.json",
    "/favicon.ico",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/logo192.png",
    "/static/js/main.84933e0f.js",
    "/static/css/main.073c9b0a.css"
    
    
    
]

 this.addEventListener("install",(event)=>{
//     event.waitUntil(
//         caches.open(cacheData).then((cache)=>{
//             cache.addAll([
//                 "/static/js/bundle.js",

//                 "/index.html",
//                 "/"
                
                
                
                
//             ])
//         })
//     )
const filesUpdate = cache => {
    const stack = [];
    assets.forEach(file => stack.push(
        cache.add(file).catch(_=>console.error(`can't load ${file} to cache`))
    ));
    return Promise.all(stack);
};

event.waitUntil(caches.open(cacheData).then(filesUpdate));

 })



this.addEventListener("fetch", (event)=>{
    if(!navigator.onLine){
    event.respondWith(
        caches.match(event.request).then((res)=>{
            if(res){
               

                    return res;
                
            }

            // let requestUrl = event.request.clone();
            // return fetch(requestUrl)
        })
    )
    }
})

this.addEventListener("activate", (event) => {
        const cacheWhitelist = [];
        cacheWhitelist.push(cacheData);
        event.waitUntil(
            caches.keys().then((cacheNames) => Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhitelist.includes(cacheName)){
                        return caches.delete(cacheName);
                    }
                })
            ))
        )
    });
