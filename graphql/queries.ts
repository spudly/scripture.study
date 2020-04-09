import { gql } from "apollo-boost";
import { Volume, Book } from "../utils/types";

export const createMarks = gql`
  mutation CreateMarks($marks: [NewMark!]!) {
    createMarks(marks: $marks) {
      success
      message
    }
  }
`;
export * from "./types/CreateMarks";

export const deleteMarks = gql`
  mutation DeleteMarks($ids: [String!]!) {
    deleteMarks(ids: $ids) {
      success
      message
    }
  }
`;
export * from "./types/DeleteMarks";

export const getBook = gql`
  query GetBook($volumeTitle: String!, $bookTitle: String!) {
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
export * from "./types/GetBook";

export const getChapter = gql`
  query GetChapter($volumeTitle: String!, $bookTitle: String!, $number: Int!) {
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
        bookId
        volumeId
        number
        text
        title
        shortTitle
      }
      prev
      next
    }
  }
`;
export * from "./types/GetChapter";

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
export * from "./types/GetMarks";

export const getPeople = gql`
  query GetPeople {
    people {
      id
      name
      description
    }
  }
`;
export * from "./types/GetPeople";

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
export * from "./types/GetVolume";

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
export * from "./types/GetVolumes";

export const updateMarks = gql`
  mutation UpdateMarks($marks: [MarkUpdate!]!) {
    updateMarks(marks: $marks) {
      success
      message
    }
  }
`;
export * from "./types/UpdateMarks";
