import normalize from "./normalize";
import getAllBooks from "./getAllBooks";
import first from "./first";
import last from "./last";
import {
  Book,
  SlimChapter,
  SlimBook,
  SlimBookAndChapterAndVerse,
  SlimVerse,
  Verse,
  SlimBookAndChapter
} from "./types";
import getAdjecentChapters from "./getAdjacentChapters";
import getVerses from "./getVerses";

const slimBook = (book: Book): SlimBook => ({
  id: book.id,
  title: book.title,
  numChapters: book.chapters.length
});

const slimVerse = (verse: Verse): SlimVerse => ({
  id: verse.id,
  number: verse.number
});

const getChapter = (
  bookTitle: string,
  chapterNumber: number
): SlimBookAndChapter => {
  const book = getAllBooks().find(b => b.title === bookTitle)!;
  const chapter = book.chapters[chapterNumber - 1]!;
  return { book: slimBook(book), chapter };
};

const getVerse = (book: string, chapter: number, verse: number): SlimVerse => {
  console.log({ book, chapter, verse });
  const [found] = getVerses(
    v =>
      v.book_title === book &&
      v.chapter_number === chapter &&
      v.verse_number === verse
  );
  console.log({ found });
  return slimVerse(found);
};

const getAdjecentVerses = (
  bookTitle: string,
  chapterNumber: number,
  verseNumber: number
): [SlimBookAndChapterAndVerse, SlimBookAndChapterAndVerse] => {
  const [prevChapter, nextChapter] = getAdjecentChapters(
    bookTitle,
    chapterNumber
  );
  const curChapter = getChapter(bookTitle, chapterNumber);
  const prev =
    verseNumber === 1
      ? {
          book: prevChapter.book,
          chapter: prevChapter.chapter,
          verse: getVerse(
            prevChapter.book.title,
            prevChapter.chapter.number,
            prevChapter.chapter.numVerses
          )
        }
      : {
          book: curChapter.book,
          chapter: curChapter.chapter,
          verse: getVerse(
            curChapter.book.title,
            curChapter.chapter.number,
            verseNumber - 1
          )
        };
  const next =
    verseNumber === curChapter.chapter.numVerses
      ? {
          book: nextChapter.book,
          chapter: nextChapter.chapter,
          verse: getVerse(nextChapter.book.title, nextChapter.chapter.number, 1)
        }
      : {
          book: curChapter.book,
          chapter: curChapter.chapter,
          verse: getVerse(
            curChapter.book.title,
            curChapter.chapter.number,
            verseNumber + 1
          )
        };

  return [prev, next];
};

export default getAdjecentVerses;
