import type {ExtendableEvent, FetchEvent} from './types';

const CACHE_NAME = 'scripture-study-v1';
const CACHE_PREFETCH_URLS = ['/', '/index.client.js', '/api/volumes'];
const CACHE_ALLOW_API_URLS = [
  '/api/volumes',
  '/api/books',
  '/api/chapters',
  '/api/verses',
];

// eslint-disable-next-line no-restricted-globals
const worker = (self as any) as ServiceWorker;

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CACHE_PREFETCH_URLS);
};

const isCacheable = (request: Request, response: Response) =>
  request.method === 'GET' &&
  !request.url.startsWith('/auth') &&
  (!request.url.startsWith('/api/') ||
    CACHE_ALLOW_API_URLS.some((pattern) => request.url.startsWith(pattern))) &&
  response.ok &&
  response.type === 'basic';

const handleRequest = async (request: Request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  if (!isCacheable(request, response)) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());

  return response;
};

worker.addEventListener('install', (event) => {
  // @ts-expect-error: missing type defs
  worker.skipWaiting();
  (event as ExtendableEvent).waitUntil(initCache());
});

worker.addEventListener('fetch', (event) =>
  (event as FetchEvent).respondWith(
    handleRequest((event as FetchEvent).request),
  ),
);

worker.addEventListener('activate', (event) => {
  // @ts-expect-error: no type degs
  (event as ExtendableEvent).waitUntil(worker.clients.claim());
  console.log('service worker activated!');
});
