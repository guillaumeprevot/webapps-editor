/**
 * The service worker will cache resources to allow offline usage :
 * - GOOGLE : https://developers.google.com/web/fundamentals/primers/service-workers/#update-a-service-worker
 * - MOZILLA : https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */
var cacheName = 'v4';
var baseCacheContent = [
	'./libs/bootstrap/css/bootstrap.min.css',
	'./libs/bootstrap/js/bootstrap.min.js',
	'./libs/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css',
	'./libs/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js',
	'./libs/fontawesome/css/fontawesome.min.css',
	'./libs/fontawesome/css/solid.min.css',
	'./libs/fontawesome/webfonts/fa-solid-900.woff2', // pre-cache woff2 only
	'./libs/jquery/jquery.min.js',
	'./libs/popper/popper.min.js',
	'webapps-editor.css',
	'webapps-editor.html',
	'webapps-editor.ico',
	'webapps-editor.js',
	'webapps-editor.png'
];

self.addEventListener('install', function(event) {
	console.log('Service Worker : installed');
	event.waitUntil(caches.open(cacheName).then(function(cache) {
		console.log('Service Worker : caching data');
		return cache.addAll(baseCacheContent).then(function() {
			console.log('Service Worker : data cached');
		});
	}));
});

self.addEventListener('activate', function(event) {
	console.log('Service Worker : activated');
	event.waitUntil(caches.keys().then(function(keys) {
		var cacheWhitelist = [cacheName];
		return Promise.all(keys.map(function(key) {
			if (cacheWhitelist.indexOf(key) === -1) {
				console.log('Service Worker : cleaning old cache ' + key);
				return caches.delete(key);
			}
		}));
	}));
});

self.addEventListener('fetch', function(event) {
	console.log('Service Worker : fetching data');
	event.respondWith(caches.match(event.request).then(function(response) {
		if (response) {// Found in cache
			console.log('Service Worker : using cache for ' + event.request.url);
			return response;
		}
		console.log('Service Worker : fetching data for ' + event.request.url);
		return fetch(event.request).then(function(response) {
			// Check if we received a valid response
			if (!response || response.status !== 200 || response.type !== 'basic')
				return response;

			// IMPORTANT: Clone the response. A response is a stream
			// and because we want the browser to consume the response
			// as well as the cache consuming the response, we need
			// to clone it so we have two streams.
			var responseToCache = response.clone();

			caches.open(cacheName).then(function(cache) {
				console.log('Service Worker : caching response for ' + event.request.url);
				cache.put(event.request, responseToCache);
			});

			return response;
		});
	}));
});
