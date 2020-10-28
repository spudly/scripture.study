// @ts-check
/** @typedef {import('../src/types/service-worker').ExtendableEvent} ExtendableEvent */
/** @typedef {import('../src/types/service-worker').FetchEvent} FetchEvent */

const CACHE_NAME = 'scripture-study-v1';
const CACHE_PREFETCH_URLS = ['/', '/index.client.js', '/api/volumes'];
const CACHE_ALLOW_API_URLS = [
  '/api/volumes',
  '/api/books',
  '/api/chapters',
  '/api/verses',
];

/** @type ServiceWorker */
// eslint-disable-next-line no-restricted-globals
// @ts-expect-error: can't cast through any in js files
const worker = self;

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CACHE_PREFETCH_URLS);
};

const handleRequest = async (/** @type Request */ request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  if (request.method !== 'GET') {
    return response;
  }
  if (
    request.url.startsWith('/api/') &&
    !CACHE_ALLOW_API_URLS.some((pattern) => request.url.startsWith(pattern))
  ) {
    return response;
  }
  if (!response || !response.ok || response.type !== 'basic') {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());

  return response;
};

worker.addEventListener('install', (/** @type ExtendableEvent */ event) =>
  event.waitUntil(initCache()),
);

worker.addEventListener('fetch', (/** @type FetchEvent */ event) =>
  event.respondWith(handleRequest(event.request)),
);
