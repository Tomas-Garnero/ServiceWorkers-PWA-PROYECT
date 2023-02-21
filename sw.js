
const nombreCache = "apv-v1";
const archivos = [
    "/",
    "/index.html",
    "/error.html",
    "/css/bootstrap.css",
    "/css/styles.css",
    "/js/app.js",
    "/js/apv.js"
];

// Cuando se instala el Service Worker, no se puede utilizar window, por lo tanto se utiliza self
self.addEventListener("install", e => {
    console.log("Instalado el Service Worker");

    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log("Cacheando...");
                cache.addAll(archivos);
            })
    );
})

// Activar el Service Worker
self.addEventListener("activate", e => {
    console.log("Service Worker activado");

    // Actualizar la PWA
    e.waitUntil(
        caches.keys()
            .then(keys => {
                // console.log(keys);
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key)) // Borra las versiones anteriores
                )
            })
    )
})

// Evento fetch para descargar archivos estaticos
self.addEventListener("fetch", e => {
    console.log("Fetch...", e);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request);
            })
            .catch(() => caches.match("/error.html"))
    )
})


// Al tener este fetch, un nombre de app, y una página de inicio, ya podremos agregar nuestra PWA a la página de inicio...


// clICK EN LOS 3 PUNTOS

//  More Tools -> Remote Devices y escribir.

// http://127.0.0.1:5500/index.html

// Presionar Open.
