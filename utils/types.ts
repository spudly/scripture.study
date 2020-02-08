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
  annotations: Array<Annotation>;
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
  chapterNumbers: Array<number>;
};

export type Volume = {
  id: string;
  token: string;
  title: string;
  bookTitles: Array<string>;
};

export type Volumes = {
  volumeTitles: Array<string>;
};

export type MarkRange = [number] | [number, number];

export type Mark = {
  verseId: string;
  range?: MarkRange;
};

export type Annotation = Mark & {
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
