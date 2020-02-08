import { RawVerse, Chapter } from "./types";
import verses from "../data/verses.json";
import memoize from "./memoize";

const getChapters = memoize(
  (volumeOoken: string, bookToken: string): Array<Chapter> => {
    const map = new Map<number, Chapter>();
    for (const v of verses as Array<RawVerse>) {
      if (v.volume_lds_url === volumeOoken && v.book_lds_url === bookToken) {
        if (!map.has(v.chapter_id)) {
          map.set(v.chapter_id, {
            id: String(v.chapter_id),
            token: String(v.chapter_number),
            volumeTitle: v.volume_title,
            bookTitle: v.book_title,
            number: v.chapter_number,
            verseNumbers: []
          });
        }
        const verseNumbers = map.get(v.chapter_id)!.verseNumbers;
        if (!verseNumbers.includes(v.verse_number)) {
          verseNumbers.push(v.verse_number);
        }
      }
    }
    return [...map.values()];
  }
);

export default getChapters;
