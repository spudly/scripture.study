import type {ExtendableEvent, FetchEvent} from './types';

const CACHE_NAME = 'scripture-study-v1';
const CACHE_PREFETCH_URLS = ['/', '/js/index.js', '/api/volumes'];
const CACHE_ALLOW_API_URLS = [
  '/api/volumes',
  '/api/books',
  '/api/chapters',
  '/api/verses',
];

const parse = (url: string) => new URL(url);

// eslint-disable-next-line no-restricted-globals
const worker = (self as any) as ServiceWorker;

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CACHE_PREFETCH_URLS);
};

const isFileRequest = (request: Request) =>
  request.method === 'GET' &&
  /[.](?:json|xml|js|css|ico|png|map|svg|txt)$/iu.test(
    parse(request.url).pathname,
  );

const isRootHtmlRequest = (request: Request) =>
  request.method === 'GET' &&
  !/^[/](?:auth|api)[/]/u.test(parse(request.url).pathname) &&
  !isFileRequest(request);

const isSameOrigin = (request: Request) =>
  worker.location.origin === parse(request.url).origin;

const isHotUpdate = (request: Request) =>
  /hot-update/u.test(request.url) || /__webpack_hmr/u.test(request.url);

const isRequestCacheable = (request: Request) =>
  isSameOrigin(request) &&
  !isHotUpdate(request) &&
  (isRootHtmlRequest(request) ||
    isFileRequest(request) ||
    CACHE_ALLOW_API_URLS.some((pattern) =>
      parse(request.url).pathname.startsWith(pattern),
    ));

const isResponseCacheable = (response: Response) =>
  response.ok && response.type === 'basic';

// eslint-disable-next-line max-statements
const getCachedResponse = async (
  request: Request,
): Promise<Response | null> => {
  if (isRootHtmlRequest(request)) {
    const cachedHtmlResponse = await caches.match('/');
    if (cachedHtmlResponse) {
      // eslint-disable-next-line no-console
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
  if (isRequestCacheable(request)) {
    const cached = await getCachedResponse(request);
    if (cached) {
      // eslint-disable-next-line no-console
      console.log('[SW] cache hit', {url: request.url});
      return cached;
    }
  }
  // eslint-disable-next-line no-console
  console.log('[SW] cache miss', {url: request.url});

  const response = await fetch(request);
  if (!isRequestCacheable(request) || !isResponseCacheable(response)) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());

  return response;
};

worker.addEventListener('install', (event) => {
  // eslint-disable-next-line no-console
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
