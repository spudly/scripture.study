/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBook
// ====================================================

export interface GetBook_book_volume {
  __typename: "Volume";
  id: string;
  title: string;
  longTitle: string;
  shortTitle: string;
  sortPosition: number;
}

export interface GetBook_book_chapters {
  __typename: "Chapter";
  id: string;
  bookId: string;
  volumeId: string;
  number: number;
}

export interface GetBook_book {
  __typename: "Book";
  id: string;
  volumeId: string;
  title: string;
  longTitle: string;
  subtitle: string;
  shortTitle: string;
  sortPosition: number;
  volume: GetBook_book_volume;
  chapters: GetBook_book_chapters[];
}

export interface GetBook {
  book: GetBook_book | null;
}

export interface GetBookVariables {
  volumeTitle: string;
  bookTitle: string;
}
