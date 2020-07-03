import {ObjectID} from 'mongodb';

declare global {
  interface Window {
    CSRF_TOKEN?: string;
    BackgroundFetchManager: any;
  }

  interface ServiceWorker {
    CSRF_TOKEN?: string;
  }

  interface BackgroundFetchRecord {
    request: Request;
    responseReady: Promise<Response>;
  }

  interface BackgroundFetchEvent {
    registration: BackgroundFetchRegistration;
    waitUntil: Function;
    updateUI(options: {title?: string; icons?: Array<IconDefinition>}): unknown;
  }

  interface BackgroundFetchRegistration extends EventTarget {
    id: string;
    uploadTotal?: number;
    uploaded: number;
    downloaded: number;
    downloadTotal?: number;
    result: '' | 'success' | 'failure';
    failureReason:
      | ''
      | 'aborted'
      | 'bad-status'
      | 'fetch-error'
      | 'quota-exceeded'
      | 'download-total-exceeded';
    recordsAvailable: boolean;
    activeFetches: unknown;
    onprogress?: (event: Event) => void;
    abort: () => unknown;
    match(
      request?: RequestInfo,
      options?: MultiCacheQueryOptions,
    ): Promise<BackgroundFetchRecord>;
    matchAll(
      request?: RequestInfo,
      options?: MultiCacheQueryOptions,
    ): Promise<Array<BackgroundFetchRecord>>;
  }

  interface IconDefinition {}

  interface BackgroundFetchManager {
    fetch(
      id: string,
      requests: Array<Request | string>,
      options: {
        title: string;
        icons: Array<IconDefinition>;
        downloadTotal?: number;
      },
    ): Promise<BackgroundFetchRegistration>;
  }

  interface ServiceWorkerRegistration {
    backgroundFetch: BackgroundFetchManager;
  }

  interface ServiceWorkerEventMap {
    install: Event & {waitUntil: Function};
    sync: Event & {tag: string; waitUntil: Function};
    fetch: Event & {request: Request; respondWith: Function};
    backgroundfetchsuccess: BackgroundFetchEvent;
    backgroundfetchclick: BackgroundFetchEvent;
  }

  interface IDBFactory {
    databases(): Promise<Array<{name: string; version: number}>>;
  }
}

export type VolumeDoc = {
  _id: ObjectID;
  title: string;
  longTitle: string;
  shortTitle: string;
  sortPosition: number;
};

export type Volume = {
  id: string;
  title: string;
  longTitle: string;
  shortTitle: string;
  sortPosition: number;
};

export type VerseDoc = {
  _id: ObjectID;
  number: number;
  text: string;
  title: string;
  shortTitle: string;
  volumeId: ObjectID;
  bookId: ObjectID;
  chapterId: ObjectID;
};

export type Verse = {
  id: string;
  number: number;
  text: string;
  title: string;
  shortTitle: string;
  volumeId: string;
  bookId: string;
  chapterId: string;
  marks?: Array<Mark>;
};

export type BookDoc = {
  _id: ObjectID;
  volumeId: ObjectID;
  title: string;
  longTitle: string;
  subtitle: string;
  shortTitle: string;
  sortPosition: number;
};

export type Book = {
  id: string;
  volumeId: string;
  title: string;
  longTitle: string;
  subtitle: string;
  shortTitle: string;
  sortPosition: number;
};

export type ChapterDoc = {
  _id: ObjectID;
  bookId: ObjectID;
  volumeId: ObjectID;
  number: number;
};

export type Chapter = {
  id: string;
  bookId: string;
  volumeId: string;
  number: number;
};

export type Volumes = {
  volumeTitles: Array<string>;
};

export type VerseSelection = {
  volumeId: string;
  chapterId: string;
  verseId: string;
  range: Array<number> | null;
};

export type MarkDoc = {
  _id: ObjectID;
  type: string;
  speakerId: ObjectID;
  verseId: ObjectID;
  chapterId: ObjectID;
  volumeId: ObjectID;
  range: Array<number> | null;
  isActive: boolean;
  lastUpdated: number;
};

export type Mark = {
  id: string;
  type: string;
  speakerId: string;
  verseId: string;
  chapterId: string;
  volumeId: string;
  range: Array<number> | null;
  isActive: boolean;
  lastUpdated: number;
};

export type PersonDoc = {
  _id: ObjectID;
  name: string;
  description?: string | null;
};

export type VolumeMeta = {
  key: 'lastUpdated';
  value: number;
};

export type Person = {id: string; name: string; description?: string | null};

export type StateMicroTheme = {
  bgColor: string;
  textColor: string;
  borderColor: string;
};

export type MicroTheme = {
  default: StateMicroTheme;
  hover: StateMicroTheme;
  active: StateMicroTheme;
  activated: StateMicroTheme;
};

export type DrawerView = {type: 'CREATE_ANNOTATIONS'; marks: Array<Mark>};

export type Unstyled<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  'className' | 'style'
>;

export type SlimVolume = {id: string; title: string};
export type SlimBook = {id: string; title: string; numChapters: number};
export type SlimChapter = {id: string; number: number; numVerses: number};
export type SlimVerse = {id: string; number: number};

export type SlimBookAndChapter = {book: SlimBook; chapter: SlimChapter};

export type SlimBookAndChapterAndVerse = SlimBookAndChapter & {
  verse: SlimVerse;
};

export type ApiResponse =
  | {type: 'volumes'; volumes: Volume[]}
  | {type: 'volume'; volume: Volume}
  | {type: 'book'; book: Book}
  | {
      type: 'chapter';
      verses: Verse[];
      prev: SlimBookAndChapter;
      next: SlimBookAndChapter;
    }
  | {
      type: 'verses';
      verses: Verse[];
    }
  | {
      type: 'verse';
      verse: Verse;
      prev: SlimBookAndChapterAndVerse;
      next: SlimBookAndChapterAndVerse;
    };

export type DirectoryEntry = {
  id: string;
  href: string;
  title: string;
};

export type PromiseResult<PROMISE> = PROMISE extends Promise<infer RESULT>
  ? RESULT
  : never;

export interface Queries {
  getAllVolumes(): Promise<Array<Volume>>;
  getVolumeByTitle(title: string): Promise<Volume>;
  getAllBooksByVolumeId(volumeId: string): Promise<Array<Book>>;
  getChapterById(volumeId: string, chapterId: string): Promise<Chapter>;
  getBookById(volumeId: string, bookId: string): Promise<Book>;
  getBookByTitle(volumeId: string, title: string): Promise<Book>;
  getAllChaptersByBookId(
    volumeId: string,
    bookId: string,
  ): Promise<Array<Chapter>>;
  getChapterByBookIdAndNumber(
    volumeId: string,
    bookId: string,
    number: string | number,
  ): Promise<Chapter>;
  getAllVersesByChapterId(
    volumeId: string,
    chapterId: string,
  ): Promise<Array<Verse>>;
  queryPrevChapterUrl(
    volumeId: string,
    chapterId: string,
  ): Promise<string | null>;
  queryNextChapterUrl(
    volumeId: string,
    chapterId: string,
  ): Promise<string | null>;
  getAllSpeakers(): Promise<Array<Person>>;
  getAllMarksByChapterId(
    volumeId: string,
    chapterId: string,
  ): Promise<Array<Mark>>;
  getAllMarksByVolumeId(volumeId: string): Promise<Array<Mark>>;
  getAllUpdatedMarksByVolumeId(
    volumeId: string,
    since: number,
  ): Promise<Array<Mark>>;
}

export interface Mutations {
  createOrUpdateMarks(marks: Array<Mark>): Promise<void>;
}

export type MutationState =
  | {readyState: 'NONE'}
  | {readyState: 'LOADING'}
  | {readyState: 'COMPLETE'}
  | {readyState: 'ERROR'; error: Error};

export type Message = {type: 'CSRF_TOKEN'; token: string};