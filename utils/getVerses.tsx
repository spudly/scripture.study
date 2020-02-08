import { RawVerse, Verse } from "./types";
import rawVerses from "../data/verses.json";
import memoize from "./memoize";
import annotateVerse from "./populateVerseAnnotations";

const getVerses = memoize(
  (
    volumeToken: string,
    bookToken: string,
    chapterToken: string
  ): Array<Verse> => {
    const map = new Map<number, Verse>();
    for (const v of rawVerses as Array<RawVerse>) {
      if (
        v.volume_lds_url === volumeToken &&
        v.book_lds_url === bookToken &&
        String(v.chapter_number) === chapterToken
      ) {
        if (!map.has(v.verse_id)) {
          map.set(v.verse_id, {
            id: String(v.verse_id),
            token: String(v.verse_number),
            volumeTitle: v.volume_title,
            bookTitle: v.book_title,
            chapter: v.chapter_number,
            number: v.verse_number,
            text: v.scripture_text,
            annotations: []
          });
        }
      }
    }
    return [...map.values()].map(annotateVerse);
  }
);

export default getVerses;
