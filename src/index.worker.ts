import type {ExtendableEvent, FetchEvent} from './types';

const CACHE_NAME = 'scripture-study-v1';
const CACHE_PREFETCH_URLS = ['/', '/index.client.js', '/api/volumes'];
const CACHE_ALLOW_API_URLS = [
  '/api/volumes',
  '/api/books',
  '/api/chapters',
  '/api/verses',
];

const getPath = (url: string) => new URL(url).pathname;

// eslint-disable-next-line no-restricted-globals
const worker = (self as any) as ServiceWorker;

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CACHE_PREFETCH_URLS);
};

const isFileRequest = (request: Request) =>
  request.method === 'GET' &&
  /[.](?:json|xml|js|css|ico|png|map|svg|txt)$/iu.test(getPath(request.url));

const isRootHtmlRequest = (request: Request) =>
  request.method === 'GET' &&
  !/^[/](?:auth|api)[/]/u.test(getPath(request.url)) &&
  !isFileRequest(request);

const isCacheable = (request: Request, response: Response) =>
  (isRootHtmlRequest(request) ||
    isFileRequest(request) ||
    CACHE_ALLOW_API_URLS.some((pattern) =>
      getPath(request.url).startsWith(pattern),
    )) &&
  response.ok &&
  response.type === 'basic';

// eslint-disable-next-line max-statements
const getCachedResponse = async (
  request: Request,
): Promise<Response | null> => {
  if (isRootHtmlRequest(request)) {
    const cachedHtmlResponse = await caches.match('/');
    if (cachedHtmlResponse) {
      console.log('[SW] cache substitution', {
        original: request.url,
        replacement: '/',
      });
      return cachedHtmlResponse;
    }
  }

  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  return null;
};

// eslint-disable-next-line max-statements
const handleRequest = async (request: Request): Promise<Response> => {
  const cached = await getCachedResponse(request);
  if (cached) {
    console.log('[SW] cache hit', {url: request.url});
    return cached;
  }
  console.log('[SW] cache miss', {url: request.url});

  const response = await fetch(request);
  if (!isCacheable(request, response)) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());

  return response;
};

worker.addEventListener('install', (event) => {
  console.log('[SW] activating');
  // @ts-expect-error: missing type defs
  worker.skipWaiting();
  (event as ExtendableEvent).waitUntil(initCache());
});

worker.addEventListener('fetch', (event) => {
  (event as FetchEvent).respondWith(
    handleRequest((event as FetchEvent).request),
  );
});

worker.addEventListener('activate', (event) => {
  // @ts-expect-error: no type defs
  (event as ExtendableEvent).waitUntil(worker.clients.claim());
});
