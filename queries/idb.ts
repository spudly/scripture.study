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
  SyncableMark,
} from '../utils/types';

const createVolumesStore = (db: IDBDatabase) =>
  new Promise<void>((resolve, reject) => {
    const volumes: IDBObjectStore = db.createObjectStore('volumes', {
      keyPath: 'id',
    });
    volumes.createIndex('title', 'title');
    volumes.createIndex('sortPosition', 'sortPosition');
    volumes.transaction.addEventListener('complete', () => resolve());
    volumes.transaction.addEventListener('error', (e: any) =>
      reject(e.target.error),
    );
  });

const createMarksStore = (db: IDBDatabase) =>
  new Promise<void>((resolve, reject) => {
    const volumes: IDBObjectStore = db.createObjectStore('marks', {
      keyPath: 'id',
    });
    volumes.createIndex('verseId', 'verseId');
    volumes.createIndex('syncStatus', 'syncStatus');
    volumes.transaction.addEventListener('complete', () => resolve());
    volumes.transaction.addEventListener('error', (e: any) =>
      reject(e.target.error),
    );
  });

const createBooksStore = (db: IDBDatabase) =>
  new Promise<void>((resolve, reject) => {
    const books: IDBObjectStore = db.createObjectStore('books', {
      keyPath: 'id',
    });
    books.createIndex('title', 'title');
    books.createIndex('sortPosition', 'sortPosition');
    books.createIndex('volumeId', 'volumeId');
    books.transaction.addEventListener('complete', () => resolve());
    books.transaction.addEventListener('error', (e: any) =>
      reject(e.target.error),
    );
  });

const createChapterStore = (db: IDBDatabase) =>
  new Promise<void>((resolve, reject) => {
    const chapters: IDBObjectStore = db.createObjectStore('chapters', {
      keyPath: 'id',
    });
    chapters.createIndex('number', 'number');
    chapters.createIndex('volumeId', 'volumeId');
    chapters.createIndex('bookId', 'bookId');
    chapters.createIndex('bookId+number', ['bookId', 'number'], {
      unique: false,
    });
    chapters.transaction.addEventListener('complete', () => resolve());
    chapters.transaction.addEventListener('error', (e: any) =>
      reject(e.target.error),
    );
  });

const createVersesStore = (db: IDBDatabase) =>
  new Promise<void>((resolve, reject) => {
    const verses: IDBObjectStore = db.createObjectStore('verses', {
      keyPath: 'id',
    });
    verses.createIndex('number', 'number');
    verses.createIndex('volumeId', 'volumeId');
    verses.createIndex('bookId', 'bookId');
    verses.createIndex('chapterId', 'chapterId');
    verses.transaction.addEventListener('complete', () => resolve());
    verses.transaction.addEventListener('error', (e: any) =>
      reject(e.target.error),
    );
  });

const dbCache = new Map<string, Promise<IDBDatabase>>();

export const makeGetDb = (createStores: (db: IDBDatabase) => Promise<void>) => (
  name: string,
): Promise<IDBDatabase> => {
  const cachedPromise = dbCache.get(name);
  if (cachedPromise) {
    return cachedPromise;
  }

  const promise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(name, 4);
    request.addEventListener('error', () => reject('failed to open db'));
    request.addEventListener('upgradeneeded', (e: any) =>
      createStores(e.target.result),
    );
    request.addEventListener('success', (e: any) => {
      const db = e.target.result;
      db.addEventListener('error', (e: any) => console.error('db error', e));
      resolve(db);
    });
  });

  dbCache.set(name, promise);

  return promise;
};

const createMainDbStores = async (db: IDBDatabase) => {
  await Promise.all([createVolumesStore(db), createMarksStore(db)]);
  const volumes = await fetchJson<Array<Volume>>('/data/volumes.json');
  await insert(db, 'volumes', volumes);
};

export const getMainDb = () => makeGetDb(createMainDbStores)('main');

const createVolumeDbStores = async (db: IDBDatabase) => {
  await Promise.all([
    createBooksStore(db),
    createChapterStore(db),
    createVersesStore(db),
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

const insert = async <T = any>(
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
  const db = await getVolumeDb(volume.id);
  await Promise.all([
    insert(db, 'books', books),
    insert(db, 'chapters', chapters),
    insert(db, 'verses', verses),
  ]);
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
  query?: string | number | Array<string | number>,
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

const getAllMarksByChapterId = async (volumdId: string, chapterId: string) =>
  getAll<SyncableMark>(await getMainDb(), 'marks', 'chapterId', chapterId);

// access the db on page load. this results in creation of the db if it doesn't already exist
getMainDb();

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
};

export const mutations: Mutations = {
  createMarks: async (marks: Array<Omit<Mark, 'id'>>): Promise<void> => {
    // TODO: create a pending mark in the client-side db. these will get sync'd
    // with the server periodically
    // When fetching mark, the UI will have to include the pending marks into account
  },
  deleteMarks: async (markIds: Array<string>): Promise<void> => {
    // TODO: create a pending mark deletion in the client-side db. these will get sync'd
    // with the server periodically
    // When fetching marks, the UI will have to take the pending deletion into account
  },
  updateMarks: async (
    marks: Array<Pick<Mark, 'id' | 'speakerId'>>,
  ): Promise<void> => {
    // TODO: create a pending mark update in the client-side db. these will get sync'd
    // with the server periodically
    // When fetching marks, the UI will have to take the pending update into account
  },
};
