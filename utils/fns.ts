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
  PersonDoc,
} from '../utils/types';
import {Db, ObjectID} from 'mongodb';
import refToTitle from './refToTitle';
import refToNumber from './refToNumber';

const markDocToMark = ({_id, ...markDoc}: MarkDoc): Mark => ({
  ...markDoc,
  id: String(_id),
  speakerId: String(markDoc.speakerId),
  verseId: String(markDoc.verseId),
});

const newMarkToNewMarkDoc = (mark: Omit<Mark, 'id'>): Omit<MarkDoc, '_id'> => ({
  ...mark,
  speakerId: new ObjectID(mark.speakerId),
  verseId: new ObjectID(mark.verseId),
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

const personDocToPerson = ({_id, ...personDoc}: PersonDoc): Person => ({
  ...personDoc,
  id: String(_id),
});

const findVolumeByTitle = async (
  db: Db,
  {title}: {title: string},
): Promise<Volume | null> => {
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
  {volumeTitle, bookTitle}: {volumeTitle: string; bookTitle: string},
): Promise<Book | null> => {
  const volume = await findVolumeByTitle(db, {title: volumeTitle});
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

const findChapterByTitle = async (
  db: Db,
  {
    volumeTitle,
    bookTitle,
    number,
  }: {volumeTitle: string; bookTitle: string; number: number},
): Promise<Chapter | null> => {
  const book = await findBookByTitle(db, {volumeTitle, bookTitle});
  if (!book) {
    return null;
  }
  const chapterDoc = await db.collection<ChapterDoc>('chapters').findOne({
    bookId: new ObjectID(book.id),
    number,
  });
  if (chapterDoc) {
    return chapterDocToChapter(chapterDoc);
  }
  return null;
};

const getBookById = async (db: Db, {id}: {id: string}): Promise<Book> => {
  const bookDoc = await db
    .collection<BookDoc>('books')
    .findOne({_id: new ObjectID(id)});
  if (!bookDoc) {
    throw new Error(`Missing Book: (id: ${id})`);
  }
  return bookDocToBook(bookDoc);
};

const getVolumeById = async (db: Db, {id}: {id: string}): Promise<Volume> => {
  const volumeDoc = await db
    .collection<VolumeDoc>('volumes')
    .findOne({_id: new ObjectID(id)});
  if (!volumeDoc) {
    throw new Error(`Missing Volume: (id: ${id})`);
  }
  return volumeDocToVolume(volumeDoc);
};

const getVersesByChapterId = (
  db: Db,
  {chapterId}: {chapterId: string},
): Promise<Array<Verse>> =>
  db
    .collection<VerseDoc>('verses')
    .find({chapterId: new ObjectID(chapterId)})
    .map(verseDocToVerse)
    .toArray();

const getVersesByVolumeId = (
  db: Db,
  {volumeId}: {volumeId: string},
): Promise<Array<Verse>> =>
  db
    .collection<VerseDoc>('verses')
    .find({volumeId: new ObjectID(volumeId)})
    .map(verseDocToVerse)
    .toArray();

const findChapterByBookIdAndNumber = async (
  db: Db,
  {
    bookId,
    number,
  }: {
    bookId: string;
    number: number;
  },
): Promise<Chapter | null> => {
  const chapterDoc = await db.collection<ChapterDoc>('chapters').findOne({
    bookId: new ObjectID(bookId),
    number,
  });
  if (chapterDoc) {
    return chapterDocToChapter(chapterDoc);
  }
  return null;
};

const getChapterByBookIdAndNumber = async (
  db: Db,
  {
    bookId,
    number,
  }: {
    bookId: string;
    number: number;
  },
): Promise<Chapter> => {
  const chapter = await findChapterByBookIdAndNumber(db, {bookId, number});
  if (!chapter) {
    throw new Error(`Missing Chapter (Book: ${bookId}, Number: ${number})`);
  }
  return chapter;
};

const findBookBySortPosition = async (
  db: Db,
  {
    sortPosition,
  }: {
    sortPosition: number;
  },
): Promise<Book | null> => {
  const bookDoc = await db.collection<BookDoc>('books').findOne({sortPosition});
  if (!bookDoc) {
    return null;
  }
  return bookDocToBook(bookDoc);
};

const getBookBySortPosition = async (
  db: Db,
  {
    sortPosition,
  }: {
    sortPosition: number;
  },
): Promise<Book> => {
  const book = await findBookBySortPosition(db, {sortPosition});
  if (!book) {
    throw new Error(`Missing Book (sort position: ${sortPosition}`);
  }
  return book;
};

const getLastChapterByBookId = async (
  db: Db,
  {bookId}: {bookId: string},
): Promise<Chapter> => {
  const [chapterDoc] = await db
    .collection<ChapterDoc>('chapters')
    .find({bookId: new ObjectID(bookId)})
    .sort({number: -1})
    .limit(1)
    .toArray();

  return chapterDocToChapter(chapterDoc);
};

const findPrevChapter = async (
  db: Db,
  {chapter}: {chapter: Chapter},
): Promise<Chapter | null> => {
  if (chapter.number > 1) {
    return getChapterByBookIdAndNumber(db, {
      bookId: chapter.bookId,
      number: chapter.number - 1,
    });
  }
  const book = await getBookById(db, {id: chapter.bookId});
  if (book.sortPosition > 1) {
    const prevBook = await getBookBySortPosition(db, {
      sortPosition: book.sortPosition - 1,
    });
    return getLastChapterByBookId(db, {bookId: prevBook.id});
  }
  return null;
};

const findNextChapter = async (
  db: Db,
  {chapter}: {chapter: Chapter},
): Promise<Chapter | null> => {
  const nextChapter = await findChapterByBookIdAndNumber(db, {
    bookId: chapter.bookId,
    number: chapter.number + 1,
  });
  if (nextChapter) {
    return nextChapter;
  }
  const book = await getBookById(db, {id: chapter.bookId});
  const nextBook = await findBookBySortPosition(db, {
    sortPosition: book.sortPosition + 1,
  });
  if (nextBook) {
    return getChapterByBookIdAndNumber(db, {bookId: nextBook.id, number: 1});
  }
  return null;
};

const getChapterUrl = async (
  db: Db,
  {chapter}: {chapter: Chapter},
): Promise<string> => {
  const volume = await getVolumeById(db, {id: chapter.volumeId});
  const book = await getBookById(db, {id: chapter.bookId});
  return `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
    /\s/g,
    '.',
  )}/${chapter.number}`;
};

const findPrevChapterUrl = async (
  db: Db,
  {chapter}: {chapter: Chapter},
): Promise<string | null> => {
  const prevChapter = await findPrevChapter(db, {chapter});
  return prevChapter ? getChapterUrl(db, {chapter: prevChapter}) : null;
};

const findNextChapterUrl = async (
  db: Db,
  {chapter}: {chapter: Chapter},
): Promise<string | null> => {
  const prevChapter = await findNextChapter(db, {chapter});
  return prevChapter ? getChapterUrl(db, {chapter: prevChapter}) : null;
};

const getChaptersByBookId = (
  db: Db,
  {bookId}: {bookId: string},
): Promise<Chapter[]> =>
  db
    .collection<ChapterDoc>('chapters')
    .find({bookId: new ObjectID(bookId)})
    .map(chapterDocToChapter)
    .toArray();

const getChaptersByVolumeId = (
  db: Db,
  {volumeId}: {volumeId: string},
): Promise<Chapter[]> =>
  db
    .collection<ChapterDoc>('chapters')
    .find({volumeId: new ObjectID(volumeId)})
    .map(chapterDocToChapter)
    .toArray();

const getBooksByVolumeId = (
  db: Db,
  {volumeId}: {volumeId: string},
): Promise<Book[]> =>
  db
    .collection<BookDoc>('books')
    .find({volumeId: new ObjectID(volumeId)})
    .map(bookDocToBook)
    .toArray();

export const getBookByRef = async (
  db: Db,
  {volumeRef, bookRef}: {volumeRef: string; bookRef: string},
): Promise<Book> => {
  const book = await findBookByTitle(db, {
    volumeTitle: refToTitle(volumeRef),
    bookTitle: refToTitle(bookRef),
  });
  if (!book) {
    throw new Error('Not Found');
  }
  return book;
};

export const getVersesByVolumeRef = async (
  db: Db,
  {volumeRef}: {volumeRef: string},
): Promise<Array<Verse>> => {
  const volume = await getVolumeByRef(db, {volumeRef});
  const verses = await getVersesByVolumeId(db, {volumeId: volume.id});
  return verses;
};

export const getChaptersByVolumeRef = async (
  db: Db,
  {volumeRef}: {volumeRef: string},
): Promise<Array<Chapter>> => {
  const volume = await getVolumeByRef(db, {volumeRef});
  const chapters = await getChaptersByVolumeId(db, {volumeId: volume.id});
  return chapters;
};

export const getBooksByVolumeRef = async (
  db: Db,
  {volumeRef}: {volumeRef: string},
): Promise<Array<Book>> => {
  const volume = await getVolumeByRef(db, {volumeRef});
  const books = await getBooksByVolumeId(db, {volumeId: volume.id});
  return books;
};

export const getVolumeByRef = async (
  db: Db,
  {volumeRef}: {volumeRef: string},
): Promise<Volume> => {
  const title = refToTitle(volumeRef);
  const volume = await findVolumeByTitle(db, {title});
  if (!volume) {
    throw new Error('Not Found');
  }
  return volume;
};

export const getAllVolumes = async (
  db: Db,
  _params?: {},
): Promise<Array<Volume>> =>
  db.collection<VolumeDoc>('volumes').find().map(volumeDocToVolume).toArray();

export const getChaptersByBookRef = async (
  db: Db,
  {volumeRef, bookRef}: {volumeRef: string; bookRef: string},
): Promise<Array<Chapter>> => {
  const book = await getBookByRef(db, {volumeRef, bookRef});
  return await getChaptersByBookId(db, {bookId: book.id});
};

export const getChapterByRef = async (
  db: Db,
  {
    volumeRef,
    bookRef,
    chapterRef,
  }: {volumeRef: string; bookRef: string; chapterRef: string},
): Promise<Chapter> => {
  const chapter = await findChapterByTitle(db, {
    volumeTitle: refToTitle(volumeRef),
    bookTitle: refToTitle(bookRef),
    number: refToNumber(chapterRef),
  });
  if (!chapter) {
    throw new Error('Not Found');
  }
  return chapter;
};

export const getVersesByChapterRef = async (
  db: Db,
  {
    volumeRef,
    bookRef,
    chapterRef,
  }: {volumeRef: string; bookRef: string; chapterRef: string},
): Promise<Array<Verse>> => {
  const chapter = await findChapterByTitle(db, {
    volumeTitle: refToTitle(volumeRef),
    bookTitle: refToTitle(bookRef),
    number: refToNumber(chapterRef),
  });
  if (!chapter) {
    throw new Error('Not Found');
  }
  const verses = await getVersesByChapterId(db, {chapterId: chapter.id});
  return verses;
};

export const getAdjacentChaptersByRef = async (
  db: Db,
  {
    volumeRef,
    bookRef,
    chapterRef,
  }: {volumeRef: string; bookRef: string; chapterRef: string},
): Promise<{prev: string | null; next: string | null}> => {
  const chapter = await getChapterByRef(db, {volumeRef, bookRef, chapterRef});
  return {
    prev: await findPrevChapterUrl(db, {chapter}),
    next: await findNextChapterUrl(db, {chapter}),
  };
};

export const getAllSpeakers = (db: Db, _params?: {}): Promise<Array<Person>> =>
  db.collection<PersonDoc>('people').find().map(personDocToPerson).toArray();

export const getMarksByVerseIds = (
  db: Db,
  {
    verseIds,
  }: {
    verseIds: Array<string>;
  },
): Promise<Array<Mark>> =>
  db
    .collection<MarkDoc>('marks')
    .find({verseId: {$in: verseIds.map((verseId) => new ObjectID(verseId))}})
    .map(markDocToMark)
    .toArray();

export const createMarks = (
  db: Db,
  {marks}: {marks: Array<Omit<Mark, 'id'>>},
) => db.collection<MarkDoc>('marks').insertMany(marks.map(newMarkToNewMarkDoc));

export const deleteMarks = (db: Db, {markIds}: {markIds: Array<string>}) =>
  db.collection<MarkDoc>('marks').deleteMany({
    _id: {$in: markIds.map((id) => new ObjectID(id))},
  });

export const updateMarks = async (
  db: Db,
  {
    marks,
  }: {
    marks: Array<Pick<Mark, 'id' | 'speakerId'>>;
  },
) => {
  await Promise.all(
    marks.map((mark) =>
      db
        .collection<MarkDoc>('marks')
        .updateOne(
          {_id: new ObjectID(mark.id)},
          {$set: {speakerId: new ObjectID(mark.speakerId)}},
        ),
    ),
  );
};
