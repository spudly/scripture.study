import { RawVerse, Volume } from "./types";
import verses from "../data/verses.json";
import memoize from "./memoize";

const getVolumes = memoize(
  (): Array<Volume> => {
    const map = new Map<number, Volume>();
    for (const v of verses as Array<RawVerse>) {
      if (!map.has(v.volume_id)) {
        map.set(v.volume_id, {
          id: String(v.volume_title),
          token: v.volume_lds_url,
          title: v.volume_title,
          bookTitles: []
        });
      }
      const bookTitles = map.get(v.volume_id)!.bookTitles;
      if (!bookTitles.includes(v.book_title)) {
        bookTitles.push(v.book_title);
      }
    }
    return [...map.values()];
  }
);

export default getVolumes;
