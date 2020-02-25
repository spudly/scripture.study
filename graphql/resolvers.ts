import { IResolvers, IResolverObject } from "apollo-server";
import { Volume, Verse, Book, Chapter, Mark, Person } from "../utils/types";
import parseRef from "../utils/parseReference";
import getDataSources from "./dataSources";
import { Db } from "mongodb";

type Context = {
  dataSources: ReturnType<typeof getDataSources>;
  db: Db;
};

type MutationResponse = {
  code: number;
  success: boolean;
  message: string;
};

const ERROR_CODES = {
  UNEXPECTED: 1
};

const resolvers: IResolvers<unknown, Context> = {
  Query: {
    volumes: async (
      _,
      __,
      { dataSources: { volumes } }
    ): Promise<Array<Volume>> => volumes.collection.find().toArray(),
    books: async (_, __, { dataSources: { books } }): Promise<Array<Book>> =>
      books.collection.find().toArray(),
    chapters: async (
      _,
      __,
      { dataSources: { chapters } }
    ): Promise<Array<Chapter>> => chapters.collection.find().toArray(),
    verses: async (_, __, { dataSources: { verses } }): Promise<Array<Verse>> =>
      verses.collection.find().toArray(),
    marks: async (_, __, { dataSources: { marks } }): Promise<Array<Mark>> =>
      marks.collection.find().toArray(),
    people: async (
      _,
      __,
      { dataSources: { people } }
    ): Promise<Array<Person>> => people.collection.find().toArray(),
    reference: async (
      _,
      { reference }: { reference: string },
      { dataSources: { books, chapters, verses } }
    ) => {
      const {
        book: bookTitle,
        chapter: chapterNumber,
        verses: verseNumbers
      } = parseRef(reference);
      const book = await books.collection.findOne({
        title: bookTitle
      });
      if (!book) {
        throw new Error("No such book!");
      }
      const chapter = await chapters.collection.findOne({
        bookId: book.id,
        number: chapterNumber
      });
      if (!chapter) {
        throw new Error("No such chapter!");
      }
      return {
        book,
        chapter,
        verses: await (verseNumbers
          ? verses.collection.find({
              bookId: book.id,
              chapterId: chapter.id,
              number: { $in: verseNumbers }
            })
          : verses.collection.find({
              bookId: book.id,
              chapterId: chapter.id
            })
        ).toArray()
      };
    }
  },
  Reference: {
    async prev() {
      return "TODO";
    },
    async next() {
      return "TODO";
    },
    marks: async (
      { verses },
      _,
      { dataSources: { marks } }
    ): Promise<Array<Mark>> =>
      (
        await marks.collection
          .find({ verseId: { $in: verses.map(v => v.id) } })
          .toArray()
      ).map((mark: Mark) => ({ ...mark, range: mark.range ?? undefined }))
  } as IResolverObject<
    { book: Book; chapter: Chapter; verses: Array<Verse> },
    Context,
    {}
  >,
  Verse: {
    chapter: async (
      verse,
      _,
      { dataSources: { chapters } }
    ): Promise<Chapter> =>
      chapters.collection.findOne({ id: verse.chapterId })!,
    book: async (verse, _, { dataSources: { books } }): Promise<Book> =>
      books.collection.findOne({ id: verse.bookId })!,
    volume: async (verse, _, { dataSources: { volumes } }): Promise<Volume> =>
      volumes.collection.findOne({ id: verse.volumeId })!
  } as IResolverObject<Verse, Context, {}>,
  Chapter: {
    verses: async (chapter, _, { dataSources: { verses } }): Promise<Verse[]> =>
      verses.getAllByChapterId(chapter.id),
    book: async (chapter, _, { dataSources: { books } }): Promise<Book> =>
      books.collection.findOne({ id: chapter.bookId })!,
    volume: async (chapter, _, { dataSources: { volumes } }): Promise<Volume> =>
      volumes.collection.findOne({ id: chapter.volumeId })!
  } as IResolverObject<Chapter, Context, {}>,
  Book: {
    chapters: async (
      book,
      _,
      { dataSources: { chapters } }
    ): Promise<Chapter[]> => chapters.getAllByBookId(book.id),
    volume: async (book, _, { dataSources: { volumes } }): Promise<Volume> => {
      return volumes.collection.findOne({ id: book.volumeId })!;
    }
  } as IResolverObject<Book, Context, {}>,
  Volume: {
    books: async (volume, _, { dataSources: { books } }): Promise<Book[]> =>
      books.getAllByVolumeId(volume.id)
  } as IResolverObject<Volume, Context, {}>,
  Mark: {
    verse: async (mark, _, { dataSources: { verses } }): Promise<Verse> =>
      verses.collection.findOne({ id: mark.verseId })!,
    speaker: async (mark, _, { dataSources: { people } }): Promise<Person> =>
      people.collection.findOne({ id: mark.speakerId })!
  } as IResolverObject<Mark, Context, {}>,
  Person: {
    marks: async (person, _, { dataSources: { marks } }): Promise<Mark[]> =>
      marks.getAllBySpeakerId(person.id)
  } as IResolverObject<Person, Context, {}>,
  Mutation: {
    async createMarks(
      _,
      { marks: newMarks },
      { dataSources: { marks } }
    ): Promise<MutationResponse> {
      try {
        await marks.collection.insertMany(newMarks);
        return {
          code: 0,
          success: true,
          message: "Successfully created marks"
        };
      } catch (error) {
        return {
          code: ERROR_CODES.UNEXPECTED,
          success: false,
          message: error.stack
        };
      }
    },
    async deleteMark(
      _,
      { id }: { id: string },
      { dataSources: { marks } }
    ): Promise<MutationResponse> {
      try {
        await marks.collection.findOneAndDelete({ id });
        return {
          code: 0,
          success: true,
          message: "Successfully deleted mark"
        };
      } catch (error) {
        return {
          code: ERROR_CODES.UNEXPECTED,
          success: false,
          message: error.stack
        };
      }
    }
  } as IResolverObject<unknown, Context, { marks: Array<Mark> }>
};

export default resolvers;
