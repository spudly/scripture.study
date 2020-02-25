import { RawVerse, Book } from "./types";
import verses from "../data/verses.json";
import memoize from "./memoize";

const getAllBooks = memoize(
  (): Array<Book> => {
    const map = new Map<number, Book>();
    for (const v of verses as Array<RawVerse>) {
      if (!map.has(v.book_id)) {
        map.set(v.book_id, {
          id: String(v.book_id),
          token: v.book_lds_url,
          volumeTitle: v.volume_title,
          title: v.book_title,
          chapters: []
        });
      }
      const chapters = map.get(v.book_id)!.chapters;
      let chapter = chapters.find(c => c.id === String(v.chapter_id));
      if (!chapter) {
        chapter = {
          id: String(v.chapter_id),
          number: v.chapter_number,
          numVerses: 0
        };
        chapters.push(chapter);
      }
      chapter.numVerses++;
    }
    return [...map.values()];
  }
);

export default getAllBooks;
