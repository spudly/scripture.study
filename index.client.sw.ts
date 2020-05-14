// eslint-disable-next-line no-restricted-globals
declare var self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'shuoink';
const URLS_TO_CACHE = ['/', '/index.client.js'];

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS_TO_CACHE);
};

const handleInstall = (event: ExtendableEvent) => {
  event.waitUntil(initCache());
};

const handleFetch = async (event: FetchEvent) => {
  const cachedResponse = await caches.match(event.request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(event.request);

  if (!response || !response.ok || response.type !== 'basic') {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);

  cache.put(event.request, response.clone());

  event.respondWith(response);
};

self.addEventListener('install', handleInstall);
self.addEventListener('fetch', handleFetch);

export default undefined;
