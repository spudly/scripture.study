import {ObjectID, Db} from 'mongodb';

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
  verseId: string;
  range: Array<number> | null;
};

export type MarkDoc = {
  _id: ObjectID;
  type: string;
  speakerId: ObjectID;
  verseId: ObjectID;
  range: Array<number> | null;
};

export type Mark = {
  id: string;
  type: string;
  speakerId: string;
  verseId: string;
  range: Array<number> | null;
};

export type PersonDoc = {
  _id: ObjectID;
  name: string;
  description?: string | null;
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

export type Resource<RESULT> = {
  read: () => RESULT;
};

export type PromiseResult<PROMISE> = PROMISE extends Promise<infer RESULT>
  ? RESULT
  : never;

type ApiFns = typeof import('../api/fns');

export type ApiFnName = keyof ApiFns;

export type ApiFnParams<FN> = FN extends (db: Db, params: infer P) => any
  ? P
  : never;

export type ApiFnResult<K extends ApiFnName> = PromiseResult<
  ReturnType<ApiFns[K]>
>;

export type ApiFnCall = {
  [key in ApiFnName]: ApiFnParams<ApiFns[key]> & {fn: key};
}[ApiFnName];

export type ApiFnCallName<CALL extends ApiFnCall> = CALL['fn'];

export type ApiFnParamsByName = {
  [KEY in ApiFnName]: ApiFnParams<ApiFns[KEY]>;
};

export type ApiFnCallResults = {
  [KEY in ApiFnName]: ApiFnResult<KEY>;
};
