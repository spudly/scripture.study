import fetchJson from '../utils/fetchJson';
import {Volume, Book, Chapter, Verse} from '../utils/types';
import titleToRef from '../utils/titleToRef';

const createVolumesStore = (db: IDBDatabase) =>
  new Promise((resolve, reject) => {
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

const createBooksStore = (db: IDBDatabase) =>
  new Promise((resolve, reject) => {
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
  new Promise((resolve, reject) => {
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
  new Promise((resolve, reject) => {
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

const handleUpgrateNeeded = async (e: any) => {
  const db = e.target.result;

  await Promise.all([
    createVolumesStore(db),
    createBooksStore(db),
    createChapterStore(db),
    createVersesStore(db),
  ]);
};

let __dbPromise: Promise<IDBDatabase> | null = null;
export const getDb = (): Promise<IDBDatabase> =>
  __dbPromise ??
  (__dbPromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open('texts', 1);
    request.addEventListener('error', () => reject('failed to open db'));
    request.addEventListener('upgradeneeded', handleUpgrateNeeded);
    request.addEventListener('success', (e: any) => {
      const db = e.target.result;
      db.addEventListener('error', (e: any) => console.error('db error', e));
      resolve(db);
    });
  }));

const add = async (store: IDBObjectStore, value: any) =>
  new Promise((resolve, reject) => {
    const req = store.add(value);
    req.addEventListener('success', () => resolve());
    req.addEventListener('error', (e: any) =>
      reject({error: e.target.error, value}),
    );
  });

const insert = async <T = any>(storeName: string, values: Array<T>) => {
  const db = await getDb();
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

const downloadVolumes = async () => {
  const volumes = await fetchJson<Array<Volume>>('/data/volumes.json');
  await insert('volumes', volumes);
};

const downloadVolume = async (volumeId: string) => {
  const volume = await get<Volume>('volumes', null, volumeId);
  const {books, chapters, verses} = await fetchJson<{
    books: Array<Book>;
    chapters: Array<Chapter>;
    verses: Array<Verse>;
  }>(`/data/volumes/${titleToRef(volume.title)}.json`);
  await Promise.all([
    insert('books', books),
    insert('chapters', chapters),
    insert('verses', verses),
  ]);
};

export const query = async <RECORD>(
  storeName: string,
  index?: string | null,
  q?: string | number | Array<string | number>,
): Promise<RECORD | null> => {
  const db = await getDb();
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

export const get = async <RECORD>(
  storeName: string,
  index?: string | null,
  q?: string | number | Array<string | number>,
): Promise<RECORD> => {
  const result = await query<RECORD>(storeName, index, q);
  if (result == null) {
    throw new Error(
      `get: null reqult (storeName: ${storeName}, index: ${index}, query: ${q})`,
    );
  }
  return result;
};

export const getAll = async <RECORD>(
  storeName: string,
  index?: string | null,
  query?: string,
): Promise<Array<RECORD>> => {
  const db = await getDb();
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

export const getVolumes = async (): Promise<Array<Volume>> => {
  const volumes = await getAll<Volume>('volumes');
  if (!volumes.length) {
    // should this logic live in the component instead? I think maybe it should
    await downloadVolumes();
    return getAll<Volume>('volumes');
  }
  return volumes;
};

export const getVolumeByTitle = async (title: string): Promise<Volume> =>
  get<Volume>('volumes', 'title', title);

export const getBookByTitle = async (title: string): Promise<Book> =>
  get<Book>('books', 'title', title);

export const getBooksByVolumeId = async (
  volumeId: string,
): Promise<Array<Book>> => {
  const books = await getAll<Book>('books', 'volumeId', volumeId);
  if (!books.length) {
    await downloadVolume(volumeId);
    return getBooksByVolumeId(volumeId);
  }
  return books;
};

export const getChaptersByBookId = async (
  bookId: string,
): Promise<Array<Chapter>> => getAll<Chapter>('chapters', 'bookId', bookId);

export const queryChapterByNumber = async (bookId: string, number: number) =>
  query<Chapter>('chapters', 'bookId+number', [bookId, number]);

export const getChapterByNumber = async (bookId: string, number: number) =>
  get<Chapter>('chapters', 'bookId+number', [bookId, number]);

export const getVersesByChapterId = async (
  chapterId: string,
): Promise<Array<Verse>> => getAll<Verse>('verses', 'chapterId', chapterId);

const getBookById = async (bookId: string): Promise<Book> =>
  get('books', null, bookId);

const getVolumeById = async (volumeId: string): Promise<Volume> =>
  get('volumes', null, volumeId);

const getBookBySortPosition = async (sortPosition: number): Promise<Book> =>
  get('books', 'sortPosition', sortPosition);

const queryBookBySortPosition = async (
  sortPosition: number,
): Promise<Book | null> => query('books', 'sortPosition', sortPosition);

const getLastChapterByBookId = async (bookId: string): Promise<Chapter> => {
  const allChapters = await getAll<Chapter>('chapters', 'bookId', bookId);
  return allChapters.find((chapter) => chapter.number === allChapters.length)!;
};

export const queryPrevChapter = async (
  chapter: Chapter,
): Promise<Chapter | null> => {
  if (chapter.number > 1) {
    return getChapterByNumber(chapter.bookId, chapter.number - 1);
  }
  const book = await getBookById(chapter.bookId);
  if (book.sortPosition > 1) {
    const prevBook = await getBookBySortPosition(book.sortPosition - 1);
    return getLastChapterByBookId(prevBook.id);
  }
  return null;
};

export const queryNextChapter = async (
  chapter: Chapter,
): Promise<Chapter | null> => {
  const nextChapter = await queryChapterByNumber(
    chapter.bookId,
    chapter.number + 1,
  );
  if (nextChapter) {
    return nextChapter;
  }
  const book = await getBookById(chapter.bookId);
  console.log({book});
  const nextBook = await queryBookBySortPosition(book.sortPosition + 1);
  console.log({nextBook});
  if (nextBook) {
    const nextChapter = getChapterByNumber(nextBook.id, 1);
    console.log({nextChapter});
    return nextChapter;
  }
  return null;
};

const getChapterUrl = async (chapter: Chapter): Promise<string> => {
  const volume = await getVolumeById(chapter.volumeId);
  const book = await getBookById(chapter.bookId);
  return `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
    /\s/g,
    '.',
  )}/${chapter.number}`;
};

export const queryPrevChapterUrl = async (
  chapter: Chapter,
): Promise<string | null> => {
  const prevChapter = await queryPrevChapter(chapter);
  return prevChapter ? getChapterUrl(prevChapter) : null;
};

export const queryNextChapterUrl = async (
  chapter: Chapter,
): Promise<string | null> => {
  const nextChapter = await queryNextChapter(chapter);
  return nextChapter ? getChapterUrl(nextChapter) : null;
};
