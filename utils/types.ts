export type RawVerse = {
  volume_id: number;
  book_id: number;
  chapter_id: number;
  verse_id: number;
  volume_title: string;
  book_title: string;
  volume_long_title: string;
  book_long_title: string;
  volume_subtitle: string;
  book_subtitle: string;
  volume_short_title: string;
  book_short_title: string;
  volume_lds_url: string;
  book_lds_url: string;
  chapter_number: number;
  verse_number: number;
  scripture_text: string;
  verse_title: string;
  verse_short_title: string;
};

export type Verse = {
  id: string;
  token: string;
  volumeTitle: string;
  bookTitle: string;
  chapter: number;
  number: number;
  text: string;
  marks: Array<Mark>;
};

export type Chapter = {
  id: string;
  token: string;
  volumeTitle: string;
  bookTitle: string;
  number: number;
  verseNumbers: Array<number>;
};

export type Book = {
  id: string;
  token: string;
  volumeTitle: string;
  title: string;
  chapters: Array<SlimChapter>;
};

export type Volume = {
  id: string;
  token: string;
  title: string;
  books: Array<{ id: string; title: string }>;
};

export type Volumes = {
  volumeTitles: Array<string>;
};

export type MarkRange = [number] | [number, number];

export type BaseMark = {
  verseId: string;
  range?: MarkRange;
};

export type Mark = BaseMark & {
  id: string;
  type: "speaker";
  speaker: string;
};

export type StateMicroTheme = {
  bgColor: string;
  textColor: string;
  borderColor: string;
};

export type MicroTheme = {
  default: StateMicroTheme;
  hover: StateMicroTheme;
  active: StateMicroTheme;
};

export type DrawerView = { type: "CREATE_ANNOTATIONS"; marks: Array<Mark> };

export type Unstyled<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  "className" | "style"
>;

export type SlimVolume = { id: string; title: string };
export type SlimBook = { id: string; title: string; numChapters: number };
export type SlimChapter = { id: string; number: number; numVerses: number };
export type SlimVerse = { id: string; number: number };

export type SlimBookAndChapter = { book: SlimBook; chapter: SlimChapter };

export type SlimBookAndChapterAndVerse = SlimBookAndChapter & {
  verse: SlimVerse;
};

export type ApiResponse =
  | { type: "volumes"; volumes: Volume[] }
  | { type: "volume"; volume: Volume }
  | { type: "book"; book: Book }
  | {
      type: "chapter";
      verses: Verse[];
      prev: SlimBookAndChapter;
      next: SlimBookAndChapter;
    }
  | {
      type: "verses";
      verses: Verse[];
    }
  | {
      type: "verse";
      verse: Verse;
      prev: SlimBookAndChapterAndVerse;
      next: SlimBookAndChapterAndVerse;
    };
