import normalize from "./normalize";
import getAllBooks from "./getAllBooks";
import getVerses from "./getVerses";
import { Book, Verse } from "./types";

const simpleRange = (from: number, to: number): Array<number> => {
  let values: Array<number> = [];
  for (let i = from; i <= to; i++) {
    values.push(i);
  }
  return values;
};

const parseVerseRef = (ref: string): Array<number> => {
  const groups = ref.replace(/\s/g, "").split(",");
  const verses = [];
  for (const group of groups) {
    const rangeMatch = group.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const [from, to] = group.split("-");
      verses.push(...simpleRange(Number(from), Number(to)));
    } else if (group.match(/^\d+$/)) {
      verses.push(Number(group.trim()));
    } else {
      throw new Error(`Invalid Syntax: [${group}]`);
    }
  }
  return verses;
};

type Result = { book: Book; chapter: Book["chapters"][0]; verses?: Verse[] };

const getBook = (title: string) => {
  const book = getAllBooks().find(b => normalize(b.title) === normalize(title));
  if (!book) {
    throw new Error(`No such book: ${title}`);
  }
  return book;
};

const getChapter = (number: number, book: Book) => {
  const chapter = book.chapters.find(c => c.number === number);
  if (!chapter) {
    throw new Error(`No such chapter ${book.title} ${number}`);
  }
  return chapter;
};

const parseScriptureRef = (ref: string) => {
  const results: Array<Result> = [];
  normalize(ref)
    .split(";")
    .forEach(subRef => {
      const match = subRef
        .trim()
        .toLowerCase()
        .match(/^(\d*)([a-z]+)(\d+)(?:[.:]([\d,-]+))?$/);
      if (!match) {
        throw new Error(`no match for \`  ${ref}\``);
      }
      const [, bookNum, bookName, chapterRef, versesRef] = match;
      const book = getBook(bookNum ? `${bookNum} ${bookName}` : bookName);
      const chapter = getChapter(Number(chapterRef), book);

      if (versesRef) {
        const verseNumbers = parseVerseRef(versesRef);
        const verses = getVerses(
          v =>
            v.book_title === book?.title &&
            v.chapter_number === chapter?.number &&
            verseNumbers.includes(v.verse_number)
        );
        results.push({ book, chapter, verses });
      } else {
        results.push({ book, chapter });
      }
    });
  return results;
};

// export { Result };
export default parseScriptureRef;
