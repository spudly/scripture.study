import {queries, insertVolumeData} from './queries/idb';
import './utils/types';
import {Queries, Mark, SyncableMark} from './utils/types';

// eslint-disable-next-line no-restricted-globals
declare var self: ServiceWorker;

// TODO: use "Background Fetch" to download books
// TODO: use "Background Sync" to synchronize marks across multiple devices & while offline
// TODO: store each "book" in its own db schema
// TODO: move all indexdb operations into the service worker

const CACHE_NAME = 'shuoink'; // TODO: rename this
const URLS_TO_CACHE = ['/', '/index.client.js', '/api/query/getAllVolumes'];

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS_TO_CACHE);
};

const handleInstall = (e: Event & {waitUntil: Function}) => {
  e.waitUntil(initCache());
};

const INDEXED_DB_QUERIES: Array<keyof Queries> = [
  'getAllVolumes',
  'getVolumeByTitle',
  'getAllBooksByVolumeId',
  'getChapterById',
  'getBookById',
  'getBookByTitle',
  'getAllChaptersByBookId',
  'getChapterByBookIdAndNumber',
  'getAllVersesByChapterId',
  'queryPrevChapterUrl',
  'queryNextChapterUrl',
];

const getIndexedDbResponse = async (
  request: Request,
): Promise<Response | null> => {
  const url = new URL(request.url);
  const [, queryName] = url.pathname.match('^/api/query/(\\w+)') ?? [];

  if (queryName && INDEXED_DB_QUERIES.includes(queryName as keyof Queries)) {
    const args = url.searchParams.getAll('arg') ?? [];
    const query = queries[queryName as keyof Queries];
    if (!query) {
      throw new Error(`${queryName} is not a valid query`);
    }
    // @ts-ignore
    let marks: Array<Mark | SyncableMark> = await query(...args);

    if (queryName === 'getAllMarksByChapterId') {
      const serverResponse = await getServerResponse(request);
      const serverMarks: Array<Mark> = await serverResponse.json();

      marks = (marks as Array<SyncableMark>).reduce((acc, mark) => {
        switch (mark.syncStatus) {
          case 'PENDING_UPDATE':
            return acc.map((m): Mark => (m.id === mark.id ? mark : m));
          case 'PENDING_DELETE':
            return acc.filter((m) => m.id !== mark.id);
          case 'SYNCED':
          default:
            return acc;
        }
      }, serverMarks);
    }

    return new Response(JSON.stringify(marks), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return null;
};

const getCachedResponse = async (request: Request) => caches.match(request);

const getServerResponse = async (request: Request) => {
  const response = await fetch(request);

  if (response.ok && response.type === 'basic') {
    console.log(`caching ${request.url}`);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }

  return response;
};

const getResponse = async (request: Request) => {
  const response =
    (await getIndexedDbResponse(request)) ??
    (await getCachedResponse(request)) ??
    (await getServerResponse(request));
  return response.clone();
};

const handleFetch = (
  event: Event & {request: Request; respondWith: Function},
) => event.respondWith(getResponse(event.request));

const syncMarks = async () => {
  // TODO
};

const handleSync = async (
  event: Event & {tag: string; waitUntil: Function},
) => {
  if (event.tag === 'sync-marks') {
    event.waitUntil(syncMarks());
  }
};

const handleBgFetchSuccess = (event: BackgroundFetchEvent) => {
  const bgFetch = event.registration;

  const insertVolumeRecords = async () => {
    const records = await bgFetch.matchAll();
    await Promise.all(
      records.map(async (record) => {
        const response = await record.responseReady;
        await insertVolumeData(await response.json());
      }),
    );
    event.updateUI({title: 'Download Complete!'});
  };

  event.waitUntil(insertVolumeRecords());
};

const handleBgFetchClick = (event: BackgroundFetchEvent) => {
  (self as any).clients.openWindow('/');
};

self.addEventListener('install', handleInstall);
self.addEventListener('fetch', handleFetch);
self.addEventListener('sync', handleSync);
self.addEventListener('backgroundfetchsuccess', handleBgFetchSuccess);
self.addEventListener('backgroundfetchclick', handleBgFetchClick);

export default undefined; // because ts complains if it thinks it's not a module
