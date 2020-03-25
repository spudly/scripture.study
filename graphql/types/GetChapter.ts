/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetChapter
// ====================================================

export interface GetChapter_chapter_book {
  __typename: "Book";
  id: string;
  volumeId: string;
  title: string;
  longTitle: string;
  subtitle: string;
  shortTitle: string;
  sortPosition: number;
}

export interface GetChapter_chapter_volume {
  __typename: "Volume";
  id: string;
  title: string;
  longTitle: string;
  shortTitle: string;
  sortPosition: number;
}

export interface GetChapter_chapter_verses {
  __typename: "Verse";
  id: string;
  chapterId: string;
  bookId: string;
  volumeId: string;
  number: number;
  text: string;
  title: string;
  shortTitle: string;
}

export interface GetChapter_chapter {
  __typename: "Chapter";
  id: string;
  bookId: string;
  volumeId: string;
  number: number;
  book: GetChapter_chapter_book;
  volume: GetChapter_chapter_volume;
  verses: GetChapter_chapter_verses[];
  prev: string | null;
  next: string | null;
}

export interface GetChapter {
  chapter: GetChapter_chapter | null;
}

export interface GetChapterVariables {
  volumeTitle: string;
  bookTitle: string;
  number: number;
}
