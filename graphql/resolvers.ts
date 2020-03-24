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
import { Db, ObjectID, Collection } from "mongodb";
import { getChapter, getBook } from "./queries";

type Context = {
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

const markDocToMark = ({ _id, ...markDoc }: MarkDoc): Mark => ({
  ...markDoc,
  id: String(_id),
  speakerId: String(markDoc.speakerId),
  verseId: String(markDoc.verseId)
});

const newMarkToNewMarkDoc = (mark: Omit<Mark, "id">): Omit<MarkDoc, "_id"> => ({
  ...mark,
  speakerId: new ObjectID(mark.speakerId),
  verseId: new ObjectID(mark.verseId)
});

const volumeDocToVolume = ({ _id, ...volumeDoc }: VolumeDoc): Volume => ({
  ...volumeDoc,
  id: String(_id)
});

const bookDocToBook = ({ _id, ...bookDoc }: BookDoc): Book => ({
  ...bookDoc,
  id: String(_id),
  volumeId: String(bookDoc.volumeId)
});

const chapterDocToChapter = ({ _id, ...chapterDoc }: ChapterDoc): Chapter => ({
  ...chapterDoc,
  id: String(_id),
  volumeId: String(chapterDoc.volumeId),
  bookId: String(chapterDoc.bookId)
});

const verseDocToVerse = ({ _id, ...verseDoc }: VerseDoc): Verse => ({
  ...verseDoc,
  id: String(_id),
  volumeId: String(verseDoc.volumeId),
  bookId: String(verseDoc.bookId),
  chapterId: String(verseDoc.chapterId)
});

const personDocToPerson = ({ _id, ...personDoc }: PersonDoc): Person => ({
  ...personDoc,
  id: String(_id)
});

const createChapterReference = (bookTitle: string, chapterNumber: number) =>
  `${bookTitle} ${chapterNumber - 1}`.replace(/\s/g, ".");

const getAllVolumes = async (db: Db): Promise<Array<Volume>> =>
  db
    .collection<VolumeDoc>("volumes")
    .find()
    .map(volumeDocToVolume)
    .toArray();

const findVolumeByTitle = async (
  db: Db,
  title: string
): Promise<Volume | null> => {
  const volumeDoc: VolumeDoc | null = await db
    .collection<VolumeDoc>("volumes")
    .findOne({
      title
    });
  if (volumeDoc) {
    return volumeDocToVolume(volumeDoc);
  }
  return null;
};

const findBookByTitle = async (
  db: Db,
  volumeTitle: string,
  bookTitle: string
): Promise<Book | null> => {
  const volume = await findVolumeByTitle(db, volumeTitle);
  if (!volume) {
    return null;
  }
  const bookDoc = await db
    .collection<BookDoc>("books")
    .findOne({ volumeId: new ObjectID(volume.id), title: bookTitle });
  if (bookDoc) {
    return bookDocToBook(bookDoc);
  }
  return null;
};

const findChapterByTitle = async (
  db: Db,
  volumeTitle: string,
  bookTitle: string,
  number: number
): Promise<Chapter | null> => {
  const book = await findBookByTitle(db, volumeTitle, bookTitle);
  if (!book) {
    return null;
  }
  const chapterDoc = await db.collection<ChapterDoc>("chapters").findOne({
    bookId: new ObjectID(book.id),
    number
  });
  if (chapterDoc) {
    return chapterDocToChapter(chapterDoc);
  }
  return null;
};

const getAllPeople = (db: Db): Promise<Array<Person>> =>
  db
    .collection<PersonDoc>("people")
    .find()
    .map(personDocToPerson)
    .toArray();

const getChapterById = async (db: Db, id: string): Promise<Chapter> => {
  const chapterDoc = await db
    .collection<ChapterDoc>("chapters")
    .findOne({ _id: new ObjectID(id) });
  if (!chapterDoc) {
    throw new Error(`Missing chapter (id: ${id})`);
  }
  return chapterDocToChapter(chapterDoc);
};

const getBookById = async (db: Db, id: string): Promise<Book> => {
  const bookDoc = await db
    .collection<BookDoc>("books")
    .findOne({ _id: new ObjectID(id) });
  if (!bookDoc) {
    throw new Error(`Missing Book: (id: ${id})`);
  }
  return bookDocToBook(bookDoc);
};

const getVolumeById = async (db: Db, id: string): Promise<Volume> => {
  const volumeDoc = await db
    .collection<VolumeDoc>("volumes")
    .findOne({ _id: new ObjectID(id) });
  if (!volumeDoc) {
    throw new Error(`Missing Volume: (id: ${id})`);
  }
  return volumeDocToVolume(volumeDoc);
};

const getVersesByChapterId = (
  db: Db,
  chapterId: string
): Promise<Array<Verse>> =>
  db
    .collection<VerseDoc>("verses")
    .find({ chapterId: new ObjectID(chapterId) })
    .map(verseDocToVerse)
    .toArray();

const findChapterByBookIdAndNumber = async (
  db: Db,
  bookId: string,
  number: number
): Promise<Chapter | null> => {
  const chapterDoc = await db.collection<ChapterDoc>("chapters").findOne({
    bookId: new ObjectID(bookId),
    number
  });
  if (chapterDoc) {
    return chapterDocToChapter(chapterDoc);
  }
  return null;
};

const getChapterByBookIdAndNumber = async (
  db: Db,
  bookId: string,
  number: number
): Promise<Chapter> => {
  const chapter = await findChapterByBookIdAndNumber(db, bookId, number);
  if (!chapter) {
    throw new Error(`Missing Chapter (Book: ${bookId}, Number: ${number})`);
  }
  return chapter;
};

const findBookBySortPosition = async (
  db: Db,
  sortPosition: number
): Promise<Book | null> => {
  const bookDoc = await db
    .collection<BookDoc>("books")
    .findOne({ sortPosition });
  if (!bookDoc) {
    return null;
  }
  return bookDocToBook(bookDoc);
};

const getBookBySortPosition = async (
  db: Db,
  sortPosition: number
): Promise<Book> => {
  const book = await findBookBySortPosition(db, sortPosition);
  if (!book) {
    throw new Error(`Missing Book (sort position: ${sortPosition}`);
  }
  return book;
};

const getLastChapterByBookId = async (
  db: Db,
  bookId: string
): Promise<Chapter> => {
  const [chapterDoc] = await db
    .collection<ChapterDoc>("chapters")
    .find({ bookId: new ObjectID(bookId) })
    .sort({ number: -1 })
    .limit(1)
    .toArray();

  return chapterDocToChapter(chapterDoc);
};

const findPrevChapter = async (
  db: Db,
  chapter: Chapter
): Promise<Chapter | null> => {
  if (chapter.number > 1) {
    return getChapterByBookIdAndNumber(db, chapter.bookId, chapter.number - 1);
  }
  const book = await getBookById(db, chapter.bookId);
  if (book.sortPosition > 1) {
    const prevBook = await getBookBySortPosition(db, book.sortPosition - 1);
    return getLastChapterByBookId(db, prevBook.id);
  }
  return null;
};

const findNextChapter = async (
  db: Db,
  chapter: Chapter
): Promise<Chapter | null> => {
  const nextChapter = await findChapterByBookIdAndNumber(
    db,
    chapter.bookId,
    chapter.number + 1
  );
  if (nextChapter) {
    return nextChapter;
  }
  const book = await getBookById(db, chapter.bookId);
  const nextBook = await findBookBySortPosition(db, book.sortPosition + 1);
  if (nextBook) {
    return getChapterByBookIdAndNumber(db, nextBook.id, 1);
  }
  return null;
};

const getChapterUrl = async (db: Db, chapter: Chapter): Promise<string> => {
  const volume = await getVolumeById(db, chapter.volumeId);
  const book = await getBookById(db, chapter.bookId);
  return `/${volume.title.replace(/\s/g, ".")}/${book.title.replace(
    /\s/g,
    "."
  )}/${chapter.number}`;
};

const findPrevChapterUrl = async (
  db: Db,
  chapter: Chapter
): Promise<string | null> => {
  const prevChapter = await findPrevChapter(db, chapter);
  return prevChapter ? getChapterUrl(db, prevChapter) : null;
};

const findNextChapterUrl = async (
  db: Db,
  chapter: Chapter
): Promise<string | null> => {
  const prevChapter = await findNextChapter(db, chapter);
  return prevChapter ? getChapterUrl(db, prevChapter) : null;
};

const getChaptersByBookId = (db: Db, bookId: string): Promise<Chapter[]> =>
  db
    .collection<ChapterDoc>("chapters")
    .find({ bookId: new ObjectID(bookId) })
    .map(chapterDocToChapter)
    .toArray();

const getBooksByVolumeId = (db: Db, volumeId: string): Promise<Book[]> =>
  db
    .collection<BookDoc>("books")
    .find({ volumeId: new ObjectID(volumeId) })
    .map(bookDocToBook)
    .toArray();

const getVerseById = async (db: Db, id: string): Promise<Verse> => {
  const verse = await db
    .collection<VerseDoc>("verses")
    .findOne({ _id: new ObjectID(id) });
  if (verse) {
    return verseDocToVerse(verse);
  }
  throw new Error("Verse not found");
};

const getSpeakerById = async (db: Db, id: string): Promise<Person> => {
  const speaker = await db
    .collection<PersonDoc>("people")
    .findOne({ _id: new ObjectID(id) });
  if (speaker) {
    return personDocToPerson(speaker);
  }
  throw new Error("Person not found");
};

const getMarksBySpeakerId = async (
  db: Db,
  speakerId: string
): Promise<Mark[]> =>
  db
    .collection<MarkDoc>("marks")
    .find({ speakerId: new ObjectID(speakerId) })
    .map(markDocToMark)
    .toArray();

const mutate = async (
  fn: () => Promise<unknown>,
  successMsg: string
): Promise<MutationResponse> => {
  try {
    await fn();
    return {
      code: 0,
      success: true,
      message: successMsg
    };
  } catch (error) {
    return {
      code: ERROR_CODES.UNEXPECTED,
      success: false,
      message: error.stack
    };
  }
};

const createMarks = (db: Db, marks: Array<Omit<Mark, "id">>) =>
  db.collection<MarkDoc>("marks").insertMany(marks.map(newMarkToNewMarkDoc));

const deleteMarks = (db: Db, markIds: Array<string>) =>
  db.collection<MarkDoc>("marks").deleteMany({
    _id: { $in: markIds.map(id => new ObjectID(id)) }
  });

const updateMarks = (db: Db, marks: Array<Pick<Mark, "id" | "speakerId">>) =>
  Promise.all(
    marks.map(mark =>
      db
        .collection<MarkDoc>("marks")
        .findOneAndUpdate(
          { id: new ObjectID(mark.id) },
          { $set: { speakerId: new ObjectID(mark.speakerId) } }
        )
    )
  );

const getMarksByVerseIds = (
  db: Db,
  verseIds: Array<string>
): Promise<Array<Mark>> =>
  db
    .collection<MarkDoc>("marks")
    .find({ verseId: { $in: verseIds.map(verseId => new ObjectID(verseId)) } })
    .map(markDocToMark)
    .toArray();

const resolvers: IResolvers<unknown, Context> = {
  Query: {
    volumes: (_, __, { db }) => getAllVolumes(db),
    volume: (_, { title }, { db }) => findVolumeByTitle(db, title),
    book: (_, { volumeTitle, bookTitle }, { db }) =>
      findBookByTitle(db, volumeTitle, bookTitle),
    chapter: (_, { volumeTitle, bookTitle, number }, { db }) =>
      findChapterByTitle(db, volumeTitle, bookTitle, number),
    people: (_, __, { db }) => getAllPeople(db),
    marks: (_, { verseIds }, { db }) => getMarksByVerseIds(db, verseIds)
  },
  Verse: {
    chapter: (verse, _, { db }) => getChapterById(db, verse.chapterId),
    book: (verse, _, { db }) => getBookById(db, verse.bookId),
    volume: (verse, _, { db }) => getVolumeById(db, verse.volumeId),
    marks: (verse, _, { db }) => getMarksByVerseIds(db, [verse.id])
  } as IResolverObject<Verse, Context, {}>,
  Chapter: {
    verses: (chapter, _, { db }) => getVersesByChapterId(db, chapter.id),
    book: (chapter, _, { db }) => getBookById(db, chapter.bookId),
    volume: (chapter, _, { db }) => getVolumeById(db, chapter.volumeId),
    prev: (chapter, _, { db }) => findPrevChapterUrl(db, chapter),
    next: (chapter, _, { db }) => findNextChapterUrl(db, chapter)
  } as IResolverObject<Chapter, Context, {}>,
  Book: {
    chapters: (book, _, { db }) => getChaptersByBookId(db, book.id),
    volume: (book, _, { db }) => getVolumeById(db, book.volumeId)
  } as IResolverObject<Book, Context, {}>,
  Volume: {
    books: (volume, _, { db }) => getBooksByVolumeId(db, volume.id)
  } as IResolverObject<Volume, Context, {}>,
  Mark: {
    verse: (mark, _, { db }) => getVerseById(db, mark.verseId),
    speaker: (mark, _, { db }) => getSpeakerById(db, mark.speakerId)
  } as IResolverObject<Mark, Context, {}>,
  Person: {
    marks: (person, _, { db }) => getMarksBySpeakerId(db, person.id)
  } as IResolverObject<Person, Context, {}>,
  Mutation: {
    createMarks: (_, { marks }: { marks: Array<Mark> }, { db }) =>
      mutate(() => createMarks(db, marks), "created marks"),
    deleteMarks: (_, { ids }: { ids: string[] }, { db }) =>
      mutate(() => deleteMarks(db, ids), "deleted marks"),
    updateMarks: (_, { marks }, { db }) =>
      mutate(() => updateMarks(db, marks), "updated marks")
  } as IResolverObject<unknown, Context, { marks: Array<Mark> }>
};

export default resolvers;
