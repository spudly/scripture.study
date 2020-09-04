import {ObjectID} from 'mongodb';
import {ReactElement} from 'react';

type MyUser = {
  id: string;
  displayName: string;
  gender?: string;
  ageRange?: {
    min: number;
    max?: number;
  };
  picture?: string;
  profileUrl?: string;
  username?: string;
  birthday: string;
  roles?: Array<string>;
  provider: string;
  name?: {
    familyName: string;
    givenName: string;
    middleName?: string;
  };
  emails?: Array<{
    value: string;
    type?: string;
  }>;
  photos?: Array<{
    value: string;
  }>;
};

export type User = MyUser;

declare global {
  namespace Express {
    interface User extends MyUser {}
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

export type SpeakerDoc = {
  _id: ObjectID;
  name: string | undefined;
  description?: string | undefined;
};

export type VolumeMeta = {
  key: 'lastUpdated';
  value: number;
};

export type NewSpeaker = {id?: string; name?: string; description?: string};

export type Speaker = {id: string; name?: string; description?: string};

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

export type QueryOptions = {noCache?: boolean};

export interface Queries {
  getAllVolumes(opts?: QueryOptions): Promise<Array<Volume>>;
  getVolumeByTitle(title: string, opts?: QueryOptions): Promise<Volume>;
  getAllBooksByVolumeId(
    volumeId: string,
    opts?: QueryOptions,
  ): Promise<Array<Book>>;
  getChapterById(
    volumeId: string,
    chapterId: string,
    opts?: QueryOptions,
  ): Promise<Chapter>;
  getBookById(
    volumeId: string,
    bookId: string,
    opts?: QueryOptions,
  ): Promise<Book>;
  getBookByTitle(
    volumeId: string,
    title: string,
    opts?: QueryOptions,
  ): Promise<Book>;
  getAllChaptersByBookId(
    volumeId: string,
    bookId: string,
    opts?: QueryOptions,
  ): Promise<Array<Chapter>>;
  getChapterByBookIdAndNumber(
    volumeId: string,
    bookId: string,
    number: string | number,
    opts?: QueryOptions,
  ): Promise<Chapter>;
  getAllVersesByChapterId(
    volumeId: string,
    chapterId: string,
    opts?: QueryOptions,
  ): Promise<Array<Verse>>;
  queryPrevChapterUrl(
    volumeId: string,
    chapterId: string,
    opts?: QueryOptions,
  ): Promise<string | null>;
  queryNextChapterUrl(
    volumeId: string,
    chapterId: string,
    opts?: QueryOptions,
  ): Promise<string | null>;
  getAllSpeakers(opts?: QueryOptions): Promise<Array<Speaker>>;
  getAllMarksByChapterId(
    volumeId: string,
    chapterId: string,
    opts?: QueryOptions,
  ): Promise<Array<Mark>>;
  getAllMarksByVolumeId(
    volumeId: string,
    opts?: QueryOptions,
  ): Promise<Array<Mark>>;
  getAllUpdatedMarksByVolumeId(
    volumeId: string,
    since: number,
    opts?: QueryOptions,
  ): Promise<Array<Mark>>;
}

export interface Mutations {
  createOrUpdateMarks(marks: Array<Mark>): Promise<void>;
  createOrUpdateSpeaker(speaker: NewSpeaker): Promise<void>;
}

export type MutationState =
  | {readyState: 'NONE'}
  | {readyState: 'LOADING'}
  | {readyState: 'COMPLETE'}
  | {readyState: 'ERROR'; error: Error};

export type NativeElement<
  TAG extends keyof JSX.IntrinsicElements
> = ReactElement<JSX.IntrinsicElements[TAG], TAG>;
export type ChildElements<T> = T | T[];

export type TableSection = NativeElement<'thead' | 'tbody' | 'tfoot'>;
export type TableRow = NativeElement<'tr'>;
export type TableCell = NativeElement<'th' | 'td'>;
