import { gql } from "apollo-boost";
import { Volume, Book } from "../utils/types";

export const getVolumes = gql`
  query GetVolumes {
    volumes {
      id
      title
      longTitle
      shortTitle
      sortPosition
    }
  }
`;

export const getVolume = gql`
  query GetVolume($title: String!) {
    volume(title: $title) {
      id
      title
      longTitle
      shortTitle
      sortPosition
      books {
        id
        volumeId
        title
        longTitle
        subtitle
        shortTitle
        sortPosition
      }
    }
  }
`;

export type GetVolumeData = {
  volume: (Volume & { books: Array<Book> }) | null;
};

export type GetVolumeVariables = { title: string };

export const getBook = gql`
  query GetBooks($volumeTitle: String!, $bookTitle: String!) {
    book(volumeTitle: $volumeTitle, bookTitle: $bookTitle) {
      id
      volumeId
      title
      longTitle
      subtitle
      shortTitle
      sortPosition
      volume {
        id
        title
        longTitle
        shortTitle
        sortPosition
      }
      chapters {
        id
        bookId
        volumeId
        number
      }
    }
  }
`;

export const getChapter = gql`
  query GetChapters($volumeTitle: String!, $bookTitle: String!, $number: Int!) {
    chapter(volumeTitle: $volumeTitle, bookTitle: $bookTitle, number: $number) {
      id
      bookId
      volumeId
      number
      book {
        id
        volumeId
        title
        longTitle
        subtitle
        shortTitle
        sortPosition
      }
      volume {
        id
        title
        longTitle
        shortTitle
        sortPosition
      }
      verses {
        id
        chapterId
        number
        text
        title
        shortTitle
      }
    }
  }
`;

export const getMarks = gql`
  query GetMarks($verseIds: [ID!]!) {
    marks(verseIds: $verseIds) {
      id
      type
      verseId
      range
      speakerId
    }
  }
`;

export const getPeople = gql`
  query GetPeople {
    people {
      id
      name
    }
  }
`;

export const createMarks = gql`
  mutation CreateMarks($marks: [NewMark!]!) {
    createMarks(marks: $marks) {
      success
      message
    }
  }
`;

export const updateMarks = gql`
  mutation UpdateMarks($marks: [MarkUpdate!]!) {
    updateMarks(marks: $marks) {
      success
      message
    }
  }
`;

export const deleteMarks = gql`
  mutation DeleteMarks($ids: [String!]!) {
    deleteMarks(ids: $ids) {
      success
      message
    }
  }
`;
