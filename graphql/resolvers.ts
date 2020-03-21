import { IResolvers, IResolverObject } from "apollo-server";
import {
  Volume,
  Verse,
  Book,
  Chapter,
  Mark,
  MarkDoc,
  Person,
  VolumeDoc,
  BookDoc,
  ChapterDoc,
  VerseDoc,
  PersonDoc
} from "../utils/types";
import parseRef from "../utils/parseReference";
import getDataSources from "./dataSources";
import { Db, ObjectID } from "mongodb";

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

const markDocToMark = (markDoc: MarkDoc): Mark => ({
  ...markDoc,
  id: String(markDoc._id),
  speakerId: String(markDoc.speakerId),
  verseId: String(markDoc.verseId)
});

const newMarkToNewMarkDoc = (mark: Omit<Mark, "id">): Omit<MarkDoc, "_id"> => ({
  ...mark,
  speakerId: new ObjectID(mark.speakerId),
  verseId: new ObjectID(mark.verseId)
});

const volumeDocToVolume = (volumeDoc: VolumeDoc): Volume => ({
  ...volumeDoc,
  id: String(volumeDoc._id)
});

const bookDocToBook = (bookDoc: BookDoc): Book => ({
  ...bookDoc,
  id: String(bookDoc._id),
  volumeId: String(bookDoc.volumeId)
});

const chapterDocToChapter = (chapterDoc: ChapterDoc): Chapter => ({
  ...chapterDoc,
  id: String(chapterDoc._id),
  volumeId: String(chapterDoc.volumeId),
  bookId: String(chapterDoc.bookId)
});

const verseDocToVerse = (verseDoc: VerseDoc): Verse => ({
  ...verseDoc,
  id: String(verseDoc._id),
  volumeId: String(verseDoc.volumeId),
  bookId: String(verseDoc.bookId),
  chapterId: String(verseDoc.chapterId)
});

const personDocToPerson = (personDoc: PersonDoc): Person => ({
  ...personDoc,
  id: String(personDoc._id)
});

const resolvers: IResolvers<unknown, Context> = {
  Query: {
    volumes: async (
      _,
      __,
      { dataSources: { volumes } }
    ): Promise<Array<Volume>> =>
      volumes.collection
        .find()
        .map(volumeDocToVolume)
        .toArray(),
    books: async (_, __, { dataSources: { books } }): Promise<Array<Book>> =>
      books.collection
        .find()
        .map(bookDocToBook)
        .toArray(),
    chapters: async (
      _,
      __,
      { dataSources: { chapters } }
    ): Promise<Array<Chapter>> =>
      chapters.collection
        .find()
        .map(chapterDocToChapter)
        .toArray(),
    verses: async (_, __, { dataSources: { verses } }): Promise<Array<Verse>> =>
      verses.collection
        .find()
        .map(verseDocToVerse)
        .toArray(),
    marks: async (_, __, { dataSources: { marks } }): Promise<Array<Mark>> =>
      marks.collection
        .find()
        .map(markDocToMark)
        .toArray(),
    people: async (
      _,
      __,
      { dataSources: { people } }
    ): Promise<Array<Person>> =>
      people.collection
        .find()
        .map(personDocToPerson)
        .toArray(),
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
      const book: BookDoc | null = await books.collection.findOne({
        title: bookTitle
      });
      if (!book) {
        throw new Error(`No such book (${bookTitle})!`);
      }
      const chapter: ChapterDoc | null = await chapters.collection.findOne({
        bookId: book._id,
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
              bookId: book._id,
              chapterId: chapter._id,
              number: { $in: verseNumbers }
            })
          : verses.collection.find({
              bookId: book._id,
              chapterId: chapter._id
            })
        )
          .map(verseDocToVerse)
          .toArray()
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
          .find({ verseId: { $in: verses.map(v => new ObjectID(v.id)) } })
          .toArray()
      ).map(markDocToMark)
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
      chapterDocToChapter(await chapters.findOneById(verse.chapterId)!),
    book: async (verse, _, { dataSources: { books } }): Promise<Book> =>
      bookDocToBook(await books.findOneById(verse.bookId)!),
    volume: async (verse, _, { dataSources: { volumes } }): Promise<Volume> =>
      volumeDocToVolume(await volumes.findOneById(verse.volumeId)!)
  } as IResolverObject<Verse, Context, {}>,
  Chapter: {
    verses: async (chapter, _, { dataSources: { verses } }): Promise<Verse[]> =>
      (await verses.getAllByChapterId(chapter.id)).map(verseDocToVerse),
    book: async (chapter, _, { dataSources: { books } }): Promise<Book> =>
      bookDocToBook(await books.findOneById(chapter.bookId)!),
    volume: async (chapter, _, { dataSources: { volumes } }): Promise<Volume> =>
      volumeDocToVolume(await volumes.findOneById(chapter.volumeId)!)
  } as IResolverObject<Chapter, Context, {}>,
  Book: {
    chapters: async (
      book,
      _,
      { dataSources: { chapters } }
    ): Promise<Chapter[]> =>
      (await chapters.getAllByBookId(book.id)).map(chapterDocToChapter),
    volume: async (book, _, { dataSources: { volumes } }): Promise<Volume> =>
      volumeDocToVolume(await volumes.findOneById(book.volumeId)!)
  } as IResolverObject<Book, Context, {}>,
  Volume: {
    books: async (volume, _, { dataSources: { books } }): Promise<Book[]> =>
      (await books.getAllByVolumeId(volume.id)).map(bookDocToBook)
  } as IResolverObject<Volume, Context, {}>,
  Mark: {
    verse: async (mark, _, { dataSources: { verses } }): Promise<Verse> => {
      const verse = await verses.findOneById(mark.verseId);
      if (verse) {
        return verseDocToVerse(verse);
      }
      throw new Error("Verse not found");
    },
    speaker: async (mark, _, { dataSources: { people } }): Promise<Person> => {
      const speaker = await people.collection.findOne({ id: mark.speakerId });
      if (speaker) {
        return personDocToPerson(speaker);
      }
      throw new Error("Person not found");
    }
  } as IResolverObject<Mark, Context, {}>,
  Person: {
    marks: async (person, _, { dataSources: { marks } }): Promise<Mark[]> =>
      (await marks.getAllBySpeakerId(person.id)).map(markDocToMark)
  } as IResolverObject<Person, Context, {}>,
  Mutation: {
    async createMarks(
      _,
      { marks: newMarks }: { marks: Array<Mark> },
      { dataSources: { marks } }
    ): Promise<MutationResponse> {
      try {
        const {
          insertedCount,
          insertedIds
        } = await marks.collection.insertMany(
          newMarks.map(newMarkToNewMarkDoc)
        );
        const newDocs = await marks.findManyByIds(
          Array.from(insertedIds as any)
        );
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
    async deleteMarks(
      _,
      { ids }: { ids: string[] },
      { dataSources: { marks } }
    ): Promise<MutationResponse> {
      try {
        await marks.collection.deleteMany({
          _id: { $in: ids.map(id => new ObjectID(id)) }
        });
        return {
          code: 0,
          success: true,
          message: "Successfully deleted marks"
        };
      } catch (error) {
        return {
          code: ERROR_CODES.UNEXPECTED,
          success: false,
          message: error.stack
        };
      }
    },
    async updateMarks(
      _,
      { marks: newMarks }: { marks: Array<{ id: string; speakerId: string }> },
      { dataSources: { marks } }
    ): Promise<MutationResponse> {
      try {
        await Promise.all(
          newMarks.map(m =>
            marks.collection.findOneAndUpdate(
              { id: new ObjectID(m.id) },
              { $set: { speakerId: new ObjectID(m.speakerId) } }
            )
          )
        );
        return {
          code: 0,
          success: true,
          message: "Successfully deleted marks"
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
