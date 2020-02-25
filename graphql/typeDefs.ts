import { gql } from "apollo-server";

const typeDefs = gql`
  type Verse {
    id: String!
    chapterId: String!
    number: Int!
    text: String!
    title: String!
    shortTitle: String!
    chapter: Chapter!
    book: Book!
    volume: Volume!
  }

  type Chapter {
    id: String!
    bookId: String!
    volumeId: String!
    number: String!
    verses: [Verse]!
    book: Book!
    volume: Volume!
  }

  type Book {
    id: String!
    volumeId: String!
    title: String!
    longTitle: String!
    subtitle: String!
    shortTitle: String!
    chapters: [Chapter!]!
    volume: Volume!
  }

  type Volume {
    id: String!
    title: String!
    longTitle: String!
    subtitle: String!
    shortTitle: String!
    books: [Book!]!
  }

  type Mark {
    id: String!
    type: String!
    verseId: String!
    range: [Int!]
    speakerId: String!
    verse: Verse!
    speaker: Person!
  }

  type Person {
    id: String!
    name: String!
    marks: [Mark!]!
  }

  type Reference {
    book: Book
    chapter: Chapter
    verses: [Verse!]
    marks: [Mark!]
    prev: String
    next: String
  }

  type Query {
    volumes: [Volume!]!
    books: [Book!]!
    chapters: [Chapter!]!
    verses: [Verse!]!
    marks: [Mark!]!
    people: [Person!]!
    reference(reference: String): Reference!
  }

  type MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  input MarksInput {
    id: String!
    type: String!
    verseId: String!
    range: [Int!]
    speakerId: String!
  }

  type Mutation {
    createMarks(marks: [MarksInput!]): MutationResponse
    deleteMark(id: String!): MutationResponse
  }
`;

export default typeDefs;
