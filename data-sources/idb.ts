import fetchJson from '../utils/fetchJson';
import {
  Volume,
  Book,
  Chapter,
  Verse,
  Queries,
  Person,
  Mark,
  Mutations,
  VolumeMeta,
} from '../utils/types';

type IndexDescriptor = {name: string; keyPath: string | Iterable<string>};

const createObjectStore = (
  db: IDBDatabase,
  name: string,
  keyPath: IDBObjectStoreParameters['keyPath'],
  indexes: Array<IndexDescriptor> = [],
): Promise<IDBObjectStore> =>
  new Promise((resolve, reject) => {
    const store = db.createObjectStore(name, {keyPath});
    indexes.forEach((idx) => {
      if (!store.indexNames.contains(idx.name)) {
        store.createIndex(idx.name, idx.keyPath);
      }
    });
    store.transaction.addEventListener('complete', () => resolve(store));
    store.transaction.addEventListener('error', (e: any) =>
      reject(e.target.error),
    );
  });

const upgradeStore = async (
  transaction: IDBTransaction,
  name: string,
  indexes: Array<IndexDescriptor>,
) => {
  const store = transaction.objectStore(name);

  indexes.forEach((idx) => {
    if (!store.indexNames.contains(idx.name)) {
      store.createIndex(idx.name, idx.keyPath);
    }
  });
};

const createOrUpgradeStore = async (
  e: any,
  name: string,
  keyPath: IDBObjectStoreParameters['keyPath'],
  indexes: Array<IndexDescriptor> = [],
) => {
  const {
    oldVersion,
    target: {result: db, transaction},
  } = e;
  if (oldVersion < 1) {
    await createObjectStore(db, name, keyPath, indexes);
  } else {
    upgradeStore(transaction, name, indexes);
  }
};

const createVolumesStore = (e: IDBVersionChangeEvent) =>
  createOrUpgradeStore(e, 'volumes', 'id', [
    {name: 'title', keyPath: 'title'},
    {name: 'sortPosition', keyPath: 'sortPosition'},
  ]);

const createMarksStore = (e: IDBVersionChangeEvent) =>
  createOrUpgradeStore(e, 'marks', 'id', [
    {name: 'verseId', keyPath: 'verseId'},
    {name: 'chapterId', keyPath: 'chapterId'},
    {name: 'lastUpdated', keyPath: 'lastUpdated'},
  ]);

const createMetaStore = (e: IDBVersionChangeEvent) =>
  createOrUpgradeStore(e, 'meta', 'key');

const createBooksStore = (e: IDBVersionChangeEvent) =>
  createOrUpgradeStore(e, 'books', 'id', [
    {name: 'title', keyPath: 'title'},
    {name: 'sortPosition', keyPath: 'sortPosition'},
    {name: 'volumeId', keyPath: 'volumeId'},
  ]);

const createChapterStore = (e: IDBVersionChangeEvent) =>
  createOrUpgradeStore(e, 'chapters', 'id', [
    {name: 'number', keyPath: 'number'},
    {name: 'volumeId', keyPath: 'volumeId'},
    {name: 'bookId', keyPath: 'bookId'},
    {name: 'bookId+number', keyPath: ['bookId', 'number']},
  ]);

const createVersesStore = (e: IDBVersionChangeEvent) =>
  createOrUpgradeStore(e, 'verses', 'id', [
    {name: 'number', keyPath: 'number'},
    {name: 'volumeId', keyPath: 'volumeId'},
    {name: 'bookId', keyPath: 'bookId'},
    {name: 'chapterId', keyPath: 'chapterId'},
  ]);

const dbCache = new Map<string, Promise<IDBDatabase>>();

export const makeGetDb = (
  createStores: (e: IDBVersionChangeEvent) => Promise<void>,
) => async (
  name: string,
  shouldCreateIfMissing: boolean = false,
): Promise<IDBDatabase> => {
  const cachedPromise = dbCache.get(name);
  if (cachedPromise) {
    return cachedPromise;
  }

  if (!shouldCreateIfMissing) {
    const dbs = await indexedDB.databases();
    if (!dbs.some((db) => db.name === name)) {
      throw new Error(`db does not exist: [${name}]`);
    }
  }

  const promise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(name, 8);
    request.addEventListener('error', () => reject('failed to open db'));
    request.addEventListener('upgradeneeded', (e: IDBVersionChangeEvent) => {
      console.log(`UPGRAGING ${name} db`);
      createStores(e);
      console.log('UPGRADE_NEEDED', name);
    });
    request.addEventListener('success', (e: any) => {
      const db = e.target.result;
      db.addEventListener('error', (e: any) => console.error('db error', e));
      resolve(db);
    });
  });

  dbCache.set(name, promise);

  return promise;
};

const createMainDbStores = async (e: any) => {
  await createVolumesStore(e);
  const volumes = await fetchJson<Array<Volume>>('/data/volumes.json');
  await insertRecords(e.target.result, 'volumes', volumes);
};

export const getMainDb = (shouldCreateIfMissing = false) =>
  makeGetDb(createMainDbStores)('main', shouldCreateIfMissing);

const createVolumeDbStores = async (e: IDBVersionChangeEvent) => {
  await Promise.all([
    createMetaStore(e),
    createBooksStore(e),
    createChapterStore(e),
    createVersesStore(e),
    createMarksStore(e),
  ]);
};

export const getVolumeDb = makeGetDb(createVolumeDbStores);

const add = async (store: IDBObjectStore, value: any) =>
  new Promise((resolve, reject) => {
    const req = store.add(value);
    req.addEventListener('success', () => resolve());
    req.addEventListener('error', (e: any) =>
      reject({error: e.target.error, value}),
    );
  });

const put = async (store: IDBObjectStore, value: any) =>
  new Promise((resolve, reject) => {
    const req = store.put(value);
    req.addEventListener('success', () => resolve());
    req.addEventListener('error', (e: any) =>
      reject({error: e.target.error, value}),
    );
  });

const insertRecords = async <T = any>(
  db: IDBDatabase,
  storeName: string,
  values: Array<T>,
) => {
  const txn = db.transaction([storeName], 'readwrite');
  const store = txn.objectStore(storeName);
  await Promise.all(values.map((value) => add(store, value)));
  return new Promise((resolve, reject) => {
    txn.addEventListener('complete', () => {
      resolve();
    });
    txn.addEventListener('error', (e: any) => reject(e.target.error));
  });
};

const insertOrUpdateRecords = async <T = any>(
  db: IDBDatabase,
  storeName: string,
  values: Array<T>,
) => {
  const txn = db.transaction([storeName], 'readwrite');
  const store = txn.objectStore(storeName);
  await Promise.all(values.map((value) => put(store, value)));
  return new Promise((resolve, reject) => {
    txn.addEventListener('complete', () => {
      resolve();
    });
    txn.addEventListener('error', (e: any) => reject(e.target.error));
  });
};

export const insertVolumeData = async ({
  volume,
  books,
  chapters,
  verses,
}: {
  volume: Volume;
  books: Array<Book>;
  chapters: Array<Chapter>;
  verses: Array<Verse>;
}) => {
  const db = await getVolumeDb(volume.id, true);
  await Promise.all([
    insertRecords(db, 'books', books),
    insertRecords(db, 'chapters', chapters),
    insertRecords(db, 'verses', verses),
  ]);
};

export const insertOrUpdateMarks = async (
  volumeId: string,
  marks: Array<Mark>,
): Promise<void> => {
  const db = await getVolumeDb(volumeId);
  await insertOrUpdateRecords(db, 'marks', marks);
};

export const query = async <RECORD>(
  db: IDBDatabase,
  storeName: string,
  index?: string | null,
  q?: string | number | Array<string | number>,
): Promise<RECORD | null> => {
  return new Promise<RECORD>((resolve, reject) => {
    const txn = db.transaction([storeName]);
    try {
      const request = index
        ? txn
            .objectStore(storeName)
            .index(index)
            .get(q as any)
        : txn.objectStore(storeName).get(q as any);
      request.addEventListener('error', (e: any) => reject(e.target.error));
      request.addEventListener('success', (e: any) =>
        resolve(e.target.result as RECORD),
      );
    } catch (error) {
      console.log({error, storeName, index, q});
      throw error;
    }
  });
};

export const makeGet = <ARGS extends Array<any>, RESULT>(
  fn: (...args: ARGS) => Promise<RESULT | null>,
) => async (...args: ARGS): Promise<RESULT> => {
  const result = await fn(...args);
  if (result == null) {
    throw new Error(`null result`);
  }
  return result;
};

export const get = async <RECORD>(
  db: IDBDatabase,
  storeName: string,
  index?: string | null,
  q?: string | number | Array<string | number>,
): Promise<RECORD> => {
  const result = await query<RECORD>(db, storeName, index, q);
  if (result == null) {
    throw new Error(
      `get: null result (storeName: ${storeName}, index: ${index}, query: ${q})`,
    );
  }
  return result;
};

export const getAll = async <RECORD>(
  db: IDBDatabase,
  storeName: string,
  index?: string | null,
  query?: IDBValidKey | IDBKeyRange | null,
): Promise<Array<RECORD>> => {
  return new Promise<Array<RECORD>>((resolve, reject) => {
    const txn = db.transaction([storeName]);
    const request = index
      ? txn.objectStore(storeName).index(index).getAll(query)
      : txn.objectStore(storeName).getAll(query);
    request.addEventListener('error', (e: any) => reject(e.target.error));
    request.addEventListener('success', (e: any) => {
      resolve(e.target.result as Array<RECORD>);
    });
  });
};

export const deleteMultiple = async (
  db: IDBDatabase,
  storeName: string,
  ids: Array<string>,
): Promise<void> => {
  const txn = db.transaction([storeName], 'readwrite');
  await Promise.all(
    ids.map(
      (id) =>
        new Promise<void>((resolve, reject) => {
          const request = txn.objectStore(storeName).delete(id);
          request.addEventListener('error', (e: any) => reject(e.target.error));
          request.addEventListener('success', () => resolve());
        }),
    ),
  );
};

const getVolumeById = async (volumeId: string): Promise<Volume> =>
  get(await getMainDb(), 'volumes', null, volumeId);

const queryBookBySortPosition = async (
  volumeId: string,
  sortPosition: number,
): Promise<Book | null> =>
  query(await getVolumeDb(volumeId), 'books', 'sortPosition', sortPosition);

const getBookBySortPosition = makeGet(queryBookBySortPosition);

const getLastChapterByBookId = async (
  volumeId: string,
  bookId: string,
): Promise<Chapter> => {
  const allChapters = await getAll<Chapter>(
    await getVolumeDb(volumeId),
    'chapters',
    'bookId',
    bookId,
  );
  return allChapters.find((chapter) => chapter.number === allChapters.length)!;
};

export const queryPrevChapter = async (
  volumeId: string,
  chapterId: string,
): Promise<Chapter | null> => {
  const chapter = await getChapterById(volumeId, chapterId);
  if (chapter.number > 1) {
    return getChapterByBookIdAndNumber(
      volumeId,
      chapter.bookId,
      chapter.number - 1,
    );
  }
  const book = await getBookById(volumeId, chapter.bookId);
  if (book.sortPosition > 1) {
    const prevBook = await getBookBySortPosition(
      volumeId,
      book.sortPosition - 1,
    );
    return getLastChapterByBookId(volumeId, prevBook.id);
  }
  return null;
};

const getChapterById = async (
  volumeId: string,
  chapterId: string,
): Promise<Chapter> =>
  get<Chapter>(await getVolumeDb(volumeId), 'chapters', null, chapterId);

export const queryNextChapter = async (
  volumeId: string,
  chapterId: string,
): Promise<Chapter | null> => {
  const chapter = await getChapterById(volumeId, chapterId);
  const nextChapter = await queryChapterByBookIdAndNumber(
    volumeId,
    chapter.bookId,
    chapter.number + 1,
  );
  if (nextChapter) {
    return nextChapter;
  }
  const book = await getBookById(volumeId, chapter.bookId);
  console.log({book});
  const nextBook = await queryBookBySortPosition(
    volumeId,
    book.sortPosition + 1,
  );
  console.log({nextBook});
  if (nextBook) {
    const nextChapter = getChapterByBookIdAndNumber(volumeId, nextBook.id, 1);
    console.log({nextChapter});
    return nextChapter;
  }
  return null;
};

const getBookById = async (volumeId: string, bookId: string): Promise<Book> =>
  get<Book>(await getVolumeDb(volumeId), 'books', null, bookId);

const getChapterUrl = async (chapter: Chapter): Promise<string> => {
  const volume = await getVolumeById(chapter.volumeId);
  const book = await getBookById(chapter.volumeId, chapter.bookId);
  return `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
    /\s/g,
    '.',
  )}/${chapter.number}`;
};

export const queryPrevChapterUrl = async (
  volumeId: string,
  chapterId: string,
): Promise<string | null> => {
  const prevChapter = await queryPrevChapter(volumeId, chapterId);
  return prevChapter ? getChapterUrl(prevChapter) : null;
};

export const queryNextChapterUrl = async (
  volumeId: string,
  chapterId: string,
): Promise<string | null> => {
  const nextChapter = await queryNextChapter(volumeId, chapterId);
  return nextChapter ? getChapterUrl(nextChapter) : null;
};

const getAllVolumes = async (): Promise<Array<Volume>> =>
  getAll<Volume>(await getMainDb(), 'volumes');

const getVolumeByTitle = async (title: string): Promise<Volume> =>
  get<Volume>(await getMainDb(), 'volumes', 'title', title);

const getAllBooksByVolumeId = async (volumeId: string): Promise<Array<Book>> =>
  getAll<Book>(await getVolumeDb(volumeId), 'books', 'volumeId', volumeId);

const getBookByTitle = async (volumeId: string, title: string): Promise<Book> =>
  get<Book>(await getVolumeDb(volumeId), 'books', 'title', title);

const getAllChaptersByBookId = async (
  volumeId: string,
  bookId: string,
): Promise<Array<Chapter>> =>
  getAll<Chapter>(await getVolumeDb(volumeId), 'chapters', 'bookId', bookId);

const queryChapterByBookIdAndNumber = async (
  volumeId: string,
  bookId: string,
  number: string | number,
): Promise<Chapter | null> =>
  query<Chapter>(await getVolumeDb(volumeId), 'chapters', 'bookId+number', [
    bookId,
    Number(number),
  ]);

const getChapterByBookIdAndNumber = makeGet(queryChapterByBookIdAndNumber);

const getAllVersesByChapterId = async (volumeId: string, chapterId: string) =>
  getAll<Verse>(await getVolumeDb(volumeId), 'verses', 'chapterId', chapterId);

const getAllSpeakers = async () =>
  getAll<Person>(await getMainDb(), 'speakers');

const getAllMarksByChapterId = async (volumeId: string, chapterId: string) => {
  const db = await getVolumeDb(volumeId);
  const marks = await getAll<Mark>(db, 'marks', 'chapterId', chapterId);
  return marks.filter((m) => m.isActive);
};

const getAllMarksByVolumeId = async (volumeId: string) => {
  const db = await getVolumeDb(volumeId);
  const marks = await getAll<Mark>(db, 'marks');
  return marks.filter((m) => m.isActive);
};

const getAllUpdatedMarksByVolumeId = async (
  volumeId: string,
  since: number,
) => {
  const db = await getVolumeDb(volumeId);
  const marks = await getAll<Mark>(
    db,
    'marks',
    'lastUpdated',
    IDBKeyRange.lowerBound(since),
  );
  return marks.filter((m) => m.isActive);
};

const createOrUpdateMarks = async (
  marks: Array<Mark>,
  updateLastUpdated = true,
): Promise<void> => {
  const [first] = marks;
  if (!first) {
    return;
  }
  await insertOrUpdateMarks(first.volumeId, marks);
};

export const getVolumeMarksLastUpdated = async (volumeId: string) => {
  const db = await getVolumeDb(volumeId);
  const record = await query<VolumeMeta>(db, 'meta', null, 'lastUpdated');
  return record?.value ?? 0;
};

export const setVolumeMarksLastUpdated = async (
  volumeId: string,
  lastUpdated: number,
) => {
  const db = await getVolumeDb(volumeId);
  return await insertOrUpdateRecords<VolumeMeta>(db, 'meta', [
    {key: 'lastUpdated' as const, value: lastUpdated},
  ]);
};

// access the db on page load. this results in creation of the db if it doesn't already exist
getMainDb(true);

export const queries: Queries = {
  getAllVolumes,
  getVolumeByTitle,
  getAllBooksByVolumeId,
  getBookById,
  getBookByTitle,
  getChapterById,
  getAllChaptersByBookId,
  getChapterByBookIdAndNumber,
  getAllVersesByChapterId,
  queryPrevChapterUrl,
  queryNextChapterUrl,
  getAllSpeakers,
  getAllMarksByChapterId,
  getAllMarksByVolumeId,
  getAllUpdatedMarksByVolumeId,
};

export const mutations: Mutations = {
  createOrUpdateMarks,
};
