import {isNotNil} from '@spudly/pushpop';
import type {ExtendableEvent, FetchEvent} from './types';
import {version} from './meta';

const DEBUG = false;
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

const log = (...args: Array<any>): void => {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

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
      log('[SW] cache substitution', {
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
      log('[SW] cache hit', {url: request.url});
      return cached;
    }
  }
  log('[SW] cache miss', {url: request.url});

  const response = await fetch(request);
  if (!isRequestCacheable(request) || !isResponseCacheable(response)) {
    return response;
  }

  const cache = await caches.open(CACHE_KEY);
  cache.put(request, response.clone());

  return response;
};

const activate = async () => {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(async key => {
      if (key !== CACHE_KEY) {
        await caches.delete(key);
      }
    }),
  );
  // @ts-expect-error: no type defs
  await worker.clients.claim();
};

worker.addEventListener('install', event => {
  log('[SW] activating');
  // @ts-expect-error: missing type defs
  worker.skipWaiting();
  (event as ExtendableEvent).waitUntil(initCache());
});

worker.addEventListener('fetch', event => {
  (event as FetchEvent).respondWith(
    handleRequest((event as FetchEvent).request),
  );
});

worker.addEventListener('activate', event => {
  (event as ExtendableEvent).waitUntil(activate());
});
