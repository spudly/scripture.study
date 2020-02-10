import { RawVerse, Book } from "./types";
import verses from "../data/verses.json";
import memoize from "./memoize";

const getBooks = memoize(
  (volumeToken: string): Array<Book> => {
    const map = new Map<number, Book>();
    for (const v of verses as Array<RawVerse>) {
      if (v.volume_lds_url === volumeToken) {
        if (!map.has(v.book_id)) {
          map.set(v.book_id, {
            id: v.book_title,
            token: v.book_lds_url,
            volumeTitle: v.volume_title,
            title: v.book_title,
            chapterNumbers: []
          });
        }
        const chapterNumbers = map.get(v.book_id)!.chapterNumbers;
        if (!chapterNumbers.includes(v.chapter_number)) {
          chapterNumbers.push(v.chapter_number);
        }
      }
    }
    return [...map.values()];
  }
);

export default getBooks;
