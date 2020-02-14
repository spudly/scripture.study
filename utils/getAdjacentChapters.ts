import normalize from "./normalize";
import getAllBooks from "./getAllBooks";
import first from "./first";
import last from "./last";
import { Book, SlimBook, SlimBookAndChapter } from "./types";

const slimBook = (book: Book): SlimBook => ({
  id: book.id,
  title: book.title,
  numChapters: book.chapters.length
});

const getAdjecentChapters = (
  bookTitle: string,
  chapterNumber: number
): [SlimBookAndChapter, SlimBookAndChapter] => {
  const books = getAllBooks();
  const bookIndex = books.findIndex(b => b.title === bookTitle);
  const book = books[bookIndex];
  const isFirstChapter = chapterNumber === 1;
  const isLastChapter = chapterNumber === last(book.chapters).number;
  const prevBook = books[(bookIndex - 1) % books.length];
  const nextBook = books[(bookIndex + 1) % books.length];
  const prev = isFirstChapter
    ? {
        book: slimBook(prevBook),
        chapter: last(prevBook.chapters)
      }
    : { book: slimBook(book), chapter: book.chapters[chapterNumber - 2] };
  const next = isLastChapter
    ? {
        book: slimBook(nextBook),
        chapter: first(nextBook.chapters)
      }
    : { book: slimBook(book), chapter: book.chapters[chapterNumber] };
  return [prev, next];
};

export default getAdjecentChapters;
