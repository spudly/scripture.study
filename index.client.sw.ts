import {
  queries as fetchQueries,
  mutations as fetchMutations,
} from './queries/fetch';
import {
  queries as idbQueries,
  mutations as idbMutations,
  insertVolumeData,
  getVolumeMarksLastUpdated,
  setVolumeMarksLastUpdated,
} from './queries/idb';
import './utils/types';
import {Queries, Mark, Volume, Book, Chapter, Verse} from './utils/types';

// eslint-disable-next-line no-restricted-globals
declare var self: ServiceWorker;

// TODO: use "Background Fetch" to download books
// TODO: use "Background Sync" to synchronize marks across multiple devices & while offline
// TODO: store each "book" in its own db schema
// TODO: move all indexdb operations into the service worker

const CACHE_NAME = 'shuoink'; // TODO: rename thisMa
const CACHE_WHITELIST = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/index.client.js',
  '/api/query/getAllVolumes',
];
const CACHE_BLACKLIST = [/getAllMarksByChapterId/];

const initCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(CACHE_WHITELIST);
};

const handleInstall = (e: Event & {waitUntil: Function}) => {
  e.waitUntil(initCache());
};

const getIndexedDbResponse = async (
  request: Request,
): Promise<Response | null> => {
  const url = new URL(request.url);
  const [, queryName] = url.pathname.match('^/api/query/(\\w+)') ?? [];
  console.log('QUERY:', queryName);

  if (queryName && queryName in idbQueries) {
    console.log(`QUERY: ${queryName} is idb query`);
    const args = url.searchParams.getAll('arg') ?? [];
    const query = idbQueries[queryName as keyof Queries];
    if (!query) {
      console.log(`QUERY: ${queryName} is not a valid query`);
      throw new Error(`${queryName} is not a valid query`);
    }
    let result;
    try {
      // @ts-ignore
      result = await query(...args);
    } catch (error) {
      console.log(
        `QUERY: ${queryName} INDEXDB MISS (threw error): ${request.url}`,
        error,
      );
      return null;
    }

    console.log(`INDEXDB HIT: ${request.url}`);
    return makeResponse(result);
  } else {
    console.log(`not an idb query: ${queryName}`);
  }

  console.log(`INDEXDB MISS: ${request.url}`);
  return null;
};

const getCachedResponse = async (request: Request) => {
  const response = await caches.match(request);
  console.log(`CACHE ${response ? 'HIT' : 'MISS'}: ${request.url}`);
  return response;
};

const getServerResponse = async (request: Request) => {
  const response = await fetch(request);

  if (
    response.ok &&
    response.type === 'basic' &&
    !CACHE_BLACKLIST.some((regex) => regex.test(request.url))
  ) {
    console.log(`CACHE ADD: ${request.url}`);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  } else {
    console.log(`DO NOT CACHE: ${request.url}`);
  }

  return response;
};

const getResponse = async (request: Request): Promise<Response> => {
  const response =
    (await getIndexedDbResponse(request)) ??
    (await getCachedResponse(request)) ??
    (await getServerResponse(request));
  return response.clone();
};

const makeResponse = (body?: any) => {
  if (body != null) {
    return new Response(JSON.stringify(body), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return new Response(null, {
    status: 204,
    statusText: 'No Content',
  });
};

const getMutationResponse = async (request: Request): Promise<Response> => {
  const {pathname} = new URL(request.url);
  switch (pathname) {
    case '/api/mutation/createOrUpdateMarks': {
      const marks: Array<Mark> = await request.clone().json();
      await idbMutations.createOrUpdateMarks(marks);
      console.log('OPTIMISTIC RESPONSE: createOrUpdateMarks');
      return makeResponse();
    }
    default:
      throw new Error(
        `Unhandled POST request in service worker: ${request.url}`,
      );
  }
};

const handleFetch = (
  event: Event & {request: Request; respondWith: Function},
) => {
  console.log('FETCH REQUEST:', event.request.method, event.request.url);
  switch (event.request.method) {
    case 'GET':
      event.respondWith(getResponse(event.request));
      return;
    case 'POST':
      event.respondWith(getMutationResponse(event.request));
      return;
    default:
      console.log('NOT GET OR POST', event.request.method, event.request.url);
      event.respondWith(fetch(event.request));
  }
};

const syncVolumeMarks = async (volumeId: string) => {
  console.log(`SYNC: ${volumeId}`);
  const lastUpdated = await getVolumeMarksLastUpdated(volumeId);
  const timestamp = Date.now();
  const newLocalMarks = await idbQueries.getAllUpdatedMarksByVolumeId(
    volumeId,
    lastUpdated,
  );
  if (newLocalMarks.length) {
    await fetchMutations.createOrUpdateMarks(newLocalMarks);
    console.log(`SYNC: pushed local marks to server (${volumeId})`);
  } else {
    console.log(`SYNC: no local marks to sync (${volumeId})`);
  }
  const newServerMarks = await fetchQueries.getAllUpdatedMarksByVolumeId(
    volumeId,
    lastUpdated,
  );
  console.log(`SYNC: fetched remote marks (${volumeId})`);
  if (newServerMarks.length) {
    await idbMutations.createOrUpdateMarks(newServerMarks);
    console.log(`SYNC: merged remote marks (${volumeId})`, newServerMarks);
  } else {
    console.log(`SYNC: no remote marks to merge (${volumeId})`);
  }
  await setVolumeMarksLastUpdated(volumeId, timestamp);
  console.log(`SYNC: volume ${volumeId} synced`);
};

const syncMarks = async () => {
  try {
    console.log('SYNC: Syncing...');
    const dbs = await indexedDB.databases();
    const volumeIds = dbs.flatMap((db) =>
      db.name === 'main' ? [] : [db.name],
    );

    await Promise.all(volumeIds.map(syncVolumeMarks));
    console.log('SYNC: Complete');
  } catch (error) {
    console.log('SYNC: Failed', error);
  }
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
    await Promise.all([
      ...records.map(async (record) => {
        const response = await record.responseReady;
        const {volume, books, chapters, verses} = (await response.json()) as {
          volume: Volume;
          books: Array<Book>;
          chapters: Array<Chapter>;
          verses: Array<Verse>;
        };
        await Promise.all([
          insertVolumeData({volume, books, chapters, verses}),
          syncVolumeMarks(volume.id),
        ]);
      }),
    ]);
    console.log('Background Fetch Complete');
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
