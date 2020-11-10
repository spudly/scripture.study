import {isNotNil} from '@spudly/pushpop';
import type {ExtendableEvent, FetchEvent} from './types';
import {version} from './meta';

const CACHE_KEY = `scripture-study-v${version}`;
const CACHE_PREFETCH_URLS = [
  '/',
  process.env.NODE_ENV !== 'development' ? '/js/index.js' : null,
  '/api/volumes',
].filter(isNotNil);
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
  const cache = await caches.open(CACHE_KEY);
  await cache.addAll(CACHE_PREFETCH_URLS);
};

const isStaticFileRequest = (request: Request) =>
  request.method === 'GET' &&
  /[.](?:json|xml|css|ico|png|map|svg|txt)$/iu.test(
    parse(request.url).pathname,
  );

const isRootHtmlRequest = (request: Request) =>
  request.method === 'GET' &&
  !/^[/](?:auth|api)[/]/u.test(parse(request.url).pathname) &&
  !isStaticFileRequest(request) &&
  !isJsRequest(request);

const isSameOrigin = (request: Request) =>
  worker.location.origin === parse(request.url).origin;

const isHotUpdate = (request: Request) =>
  /hot-update/u.test(request.url) || /__webpack_hmr/u.test(request.url);

const isJsRequest = (request: Request) => /[.]js$/u.test(request.url);

const isRequestCacheable = (request: Request) =>
  isSameOrigin(request) &&
  !isHotUpdate(request) &&
  (isRootHtmlRequest(request) ||
    (isJsRequest(request) && process.env.NODE_ENV !== 'development') ||
    isStaticFileRequest(request) ||
    CACHE_ALLOW_API_URLS.some(pattern =>
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
      return cachedHtmlResponse;
    }
  }

  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  return null;
};

const fetchFromCache = async (request: Request): Promise<Response> => {
  if (!isRequestCacheable(request)) {
    throw new Error(`[SW] not cacheable: ${request.url}`);
  }
  const response = await getCachedResponse(request);
  if (!response) {
    throw new Error(`[SW] cache miss: ${request.url}`);
  }
  return response;
};

const fetchFromNetwork = async (request: Request): Promise<Response> => {
  const response = await fetch(request);
  if (!isRequestCacheable(request) || !isResponseCacheable(response)) {
    return response;
  }

  const cache = await caches.open(CACHE_KEY);
  cache.put(request, response.clone());

  return response;
};

worker.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(initCache().then(() => worker.skipWaiting()));
});

worker.addEventListener('fetch', (e: FetchEvent) => {
  const event = e as FetchEvent;
  const networkPromise = fetchFromNetwork(event.request);
  event.respondWith(
    fetchFromCache(event.request)
      .catch(() => networkPromise)
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(`[SW] Failed to fetch ${event.request.url}`, err);
        throw err;
      }),
  );
  event.waitUntil(networkPromise);
});

worker.addEventListener('activate', (event: ExtendableEvent) => {
  (event as ExtendableEvent).waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_KEY) {
              return caches.delete(key);
            }
            return undefined;
          }),
        ),
      )
      .then(() => worker.clients.claim()),
  );
});
