import {
  Volume,
  Verse,
  Book,
  Chapter,
  Mark,
  MarkDoc,
  Speaker,
  VolumeDoc,
  BookDoc,
  ChapterDoc,
  VerseDoc,
  SpeakerDoc,
  Queries,
  Mutations,
  NewSpeaker,
} from '../utils/types';
import {Db, MongoClient, ObjectID} from 'mongodb';

const {MONGO_USER, MONGO_PASSWORD} = process.env;

const getClient = async () => {
  const mongoClient = new MongoClient(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-qreww.mongodb.net/test?retryWrites=true&w=majority`,
    {useUnifiedTopology: true},
  );
  return mongoClient.connect();
};

let _promise: Promise<MongoClient>;
const memoizedGetClient = async () => {
  if (!_promise) {
    _promise = getClient();
  }
  return _promise;
};

const getDb = async () => {
  const client = await memoizedGetClient();
  return client.db('wikimarks');
};

const markDocToMark = ({_id, ...markDoc}: MarkDoc): Mark => ({
  ...markDoc,
  id: String(_id),
  speakerId: String(markDoc.speakerId),
  verseId: String(markDoc.verseId),
  chapterId: String(markDoc.chapterId),
  volumeId: String(markDoc.volumeId),
});

const newMarkToNewMarkDoc = ({
  id,
  speakerId,
  verseId,
  chapterId,
  volumeId,
  ...rest
}: Mark): MarkDoc => ({
  ...rest,
  _id: new ObjectID(id),
  speakerId: new ObjectID(speakerId),
  verseId: new ObjectID(verseId),
  chapterId: new ObjectID(chapterId),
  volumeId: new ObjectID(volumeId),
});

const newSpeakerToSpeakerDoc = ({
  id,
  name,
  description,
}: NewSpeaker): SpeakerDoc => ({
  _id: new ObjectID(id),
  name,
  description,
});

const volumeDocToVolume = ({_id, ...volumeDoc}: VolumeDoc): Volume => ({
  ...volumeDoc,
  id: String(_id),
});

const bookDocToBook = ({_id, ...bookDoc}: BookDoc): Book => ({
  ...bookDoc,
  id: String(_id),
  volumeId: String(bookDoc.volumeId),
});

const chapterDocToChapter = ({_id, ...chapterDoc}: ChapterDoc): Chapter => ({
  ...chapterDoc,
  id: String(_id),
  volumeId: String(chapterDoc.volumeId),
  bookId: String(chapterDoc.bookId),
});

const verseDocToVerse = ({_id, ...verseDoc}: VerseDoc): Verse => ({
  ...verseDoc,
  id: String(_id),
  volumeId: String(verseDoc.volumeId),
  bookId: String(verseDoc.bookId),
  chapterId: String(verseDoc.chapterId),
});

const speakerDocToSpeaker = ({
  _id,
  name,
  description,
}: SpeakerDoc): Speaker => ({
  id: String(_id),
  name,
  description: description ?? undefined,
});

const findVolumeByTitle = async (title: string): Promise<Volume | null> => {
  const db: Db = await getDb();
  const volumeDoc: VolumeDoc | null = await db
    .collection<VolumeDoc>('volumes')
    .findOne({
      title,
    });
  if (volumeDoc) {
    return volumeDocToVolume(volumeDoc);
  }
  return null;
};

const findBookByTitle = async (
  db: Db,
  {volumeId, bookTitle}: {volumeId: string; bookTitle: string},
): Promise<Book | null> => {
  const volume = await getVolumeById(volumeId);
  if (!volume) {
    return null;
  }
  const bookDoc = await db
    .collection<BookDoc>('books')
    .findOne({volumeId: new ObjectID(volume.id), title: bookTitle});
  if (bookDoc) {
    return bookDocToBook(bookDoc);
  }
  return null;
};

const getBookById = async (id: string): Promise<Book> => {
  const db = await getDb();
  const bookDoc = await db
    .collection<BookDoc>('books')
    .findOne({_id: new ObjectID(id)});
  if (!bookDoc) {
    throw new Error(`Missing Book: (id: ${id})`);
  }
  return bookDocToBook(bookDoc);
};

const getVolumeById = async (id: string): Promise<Volume> => {
  const db = await getDb();
  const volumeDoc = await db
    .collection<VolumeDoc>('volumes')
    .findOne({_id: new ObjectID(id)});
  if (!volumeDoc) {
    throw new Error(`Missing Volume: (id: ${id})`);
  }
  return volumeDocToVolume(volumeDoc);
};

const getAllVersesByChapterId = async (
  volumeId: string,
  chapterId: string,
): Promise<Array<Verse>> => {
  const db = await getDb();
  return db
    .collection<VerseDoc>('verses')
    .find({
      volumeId: new ObjectID(volumeId),
      chapterId: new ObjectID(chapterId),
    })
    .map(verseDocToVerse)
    .toArray();
};

const findChapterByBookIdAndNumber = async (
  bookId: string,
  number: string | number,
): Promise<Chapter | null> => {
  const db = await getDb();
  const chapterDoc = await db.collection<ChapterDoc>('chapters').findOne({
    bookId: new ObjectID(bookId),
    number: Number(number),
  });
  if (chapterDoc) {
    return chapterDocToChapter(chapterDoc);
  }
  return null;
};

const getChapterByBookIdAndNumber = async (
  volumeId: string,
  bookId: string,
  number: string | number,
): Promise<Chapter> => {
  const chapter = await findChapterByBookIdAndNumber(bookId, number);
  if (!chapter) {
    throw new Error(`Missing Chapter (Book: ${bookId}, Number: ${number})`);
  }
  return chapter;
};

const findBookBySortPosition = async (
  sortPosition: number,
): Promise<Book | null> => {
  const db = await getDb();
  const bookDoc = await db.collection<BookDoc>('books').findOne({sortPosition});
  if (!bookDoc) {
    return null;
  }
  return bookDocToBook(bookDoc);
};

const getBookBySortPosition = async (sortPosition: number): Promise<Book> => {
  const book = await findBookBySortPosition(sortPosition);
  if (!book) {
    throw new Error(`Missing Book (sort position: ${sortPosition}`);
  }
  return book;
};

const getLastChapterByBookId = async (bookId: string): Promise<Chapter> => {
  const db = await getDb();
  const [chapterDoc] = await db
    .collection<ChapterDoc>('chapters')
    .find({bookId: new ObjectID(bookId)})
    .sort({number: -1})
    .limit(1)
    .toArray();

  return chapterDocToChapter(chapterDoc);
};

const findPrevChapter = async (chapterId: string): Promise<Chapter | null> => {
  const chapter = await getChapterById(chapterId);
  if (chapter.number > 1) {
    return getChapterByBookIdAndNumber(
      chapter.volumeId,
      chapter.bookId,
      chapter.number - 1,
    );
  }
  const book = await getBookById(chapter.bookId);
  if (book.sortPosition > 1) {
    const prevBook = await getBookBySortPosition(book.sortPosition - 1);
    return getLastChapterByBookId(prevBook.id);
  }
  return null;
};

const findNextChapter = async (chapterId: string): Promise<Chapter | null> => {
  const chapter = await getChapterById(chapterId);
  const nextChapter = await findChapterByBookIdAndNumber(
    chapter.bookId,
    chapter.number + 1,
  );
  if (nextChapter) {
    return nextChapter;
  }
  const book = await getBookById(chapter.bookId);
  const nextBook = await findBookBySortPosition(book.sortPosition + 1);
  if (nextBook) {
    return getChapterByBookIdAndNumber(chapter.volumeId, nextBook.id, 1);
  }
  return null;
};

const getChapterUrl = async (chapter: Chapter): Promise<string> => {
  const volume = await getVolumeById(chapter.volumeId);
  const book = await getBookById(chapter.bookId);
  return `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
    /\s/g,
    '.',
  )}/${chapter.number}`;
};

const queryPrevChapterUrl = async (
  _volumeId: string,
  chapterId: string,
): Promise<string | null> => {
  const prevChapter = await findPrevChapter(chapterId);
  return prevChapter ? getChapterUrl(prevChapter) : null;
};

const queryNextChapterUrl = async (
  _volumeId: string,
  chapterId: string,
): Promise<string | null> => {
  const prevChapter = await findNextChapter(chapterId);
  return prevChapter ? getChapterUrl(prevChapter) : null;
};

const getAllChaptersByBookId = async (
  volumeId: string,
  bookId: string,
): Promise<Chapter[]> => {
  const db = await getDb();
  return db
    .collection<ChapterDoc>('chapters')
    .find({volumeId: new ObjectID(volumeId), bookId: new ObjectID(bookId)})
    .map(chapterDocToChapter)
    .toArray();
};

const getAllBooksByVolumeId = async (volumeId: string): Promise<Book[]> => {
  const db = await getDb();
  return db
    .collection<BookDoc>('books')
    .find({volumeId: new ObjectID(volumeId)})
    .map(bookDocToBook)
    .toArray();
};

const getBookByTitle = async (
  volumeId: string,
  bookTitle: string,
): Promise<Book> => {
  const db = await getDb();
  const book = await findBookByTitle(db, {
    volumeId,
    bookTitle,
  });
  if (!book) {
    throw new Error('Not Found');
  }
  return book;
};

const getAllVolumes = async (): Promise<Array<Volume>> => {
  const db = await getDb();
  return db
    .collection<VolumeDoc>('volumes')
    .find()
    .map(volumeDocToVolume)
    .toArray();
};

const getChapterById = async (chapterId: string): Promise<Chapter> => {
  const db = await getDb();
  const chapterDoc = await db
    .collection<ChapterDoc>('chapters')
    .findOne({_id: new ObjectID(chapterId)});
  if (!chapterDoc) {
    throw new Error('Not Found');
  }
  return chapterDocToChapter(chapterDoc);
};

const getAllSpeakers = async (): Promise<Array<Speaker>> => {
  const db = await getDb();
  return db
    .collection<SpeakerDoc>('people')
    .find()
    .map(speakerDocToSpeaker)
    .toArray();
};

const getAllMarksByChapterId = async (
  _volumeId: string,
  chapterId: string,
): Promise<Array<Mark>> => {
  const db = await getDb();

  return db
    .collection<MarkDoc>('marks')
    .find({chapterId: new ObjectID(chapterId), isActive: true})
    .map(markDocToMark)
    .toArray();
};

const getAllMarksByVolumeId = async (
  volumeId: string,
): Promise<Array<Mark>> => {
  const db = await getDb();

  return db
    .collection<MarkDoc>('marks')
    .find({volumeId: new ObjectID(volumeId), isActive: true})
    .map(markDocToMark)
    .toArray();
};

const getAllUpdatedMarksByVolumeId = async (
  volumeId: string,
  since: number,
): Promise<Array<Mark>> => {
  const db = await getDb();

  console.log('getAllUpdatedMarksByVolumeId', 'args:', {volumeId, since});

  const result = await db
    .collection<MarkDoc>('marks')
    .find({
      volumeId: new ObjectID(volumeId),
      lastUpdated: {$gte: Number(since)},
    })
    .map(markDocToMark)
    .toArray();

  console.log(result);

  return result;
};

const createOrUpdateMarks = async (marks: Array<Mark>) => {
  const db = await getDb();
  const collection = db.collection<MarkDoc>('marks');
  await Promise.all(
    marks.map((m) => {
      const doc: MarkDoc = {...newMarkToNewMarkDoc(m), lastUpdated: Date.now()};
      return collection.replaceOne({_id: doc._id}, doc, {upsert: true});
    }),
  );
};

const createOrUpdateSpeaker = async (speaker: Speaker) => {
  const db = await getDb();
  const collection = db.collection<SpeakerDoc>('people');
  const doc: SpeakerDoc = newSpeakerToSpeakerDoc(speaker);
  await collection.replaceOne({_id: doc._id}, doc, {upsert: true});
};

const getVolumeByTitle = async (title: string): Promise<Volume> => {
  const volume = await findVolumeByTitle(title);
  if (!volume) {
    throw new Error(`Missing Volume (title: ${title})`);
  }
  return volume;
};

export const queries: Queries = {
  getAllVolumes,
  getVolumeByTitle,
  getAllBooksByVolumeId,
  getChapterById,
  getBookById,
  getBookByTitle,
  getAllChaptersByBookId,
  getChapterByBookIdAndNumber,
  getAllVersesByChapterId,
  queryPrevChapterUrl,
  queryNextChapterUrl,
  getAllSpeakers,
  getAllMarksByChapterId,
  getAllMarksByVolumeId,
  getAllUpdatedMarksByVolumeId,
};

export const mutations: Mutations = {
  createOrUpdateMarks,
  createOrUpdateSpeaker,
};
