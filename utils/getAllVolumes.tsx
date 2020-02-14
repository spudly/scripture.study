import { RawVerse, Volume } from "./types";
import verses from "../data/verses.json";
import memoize from "./memoize";

const getAllVolumes = memoize(
  (): Array<Volume> => {
    const map = new Map<number, Volume>();
    for (const v of verses as Array<RawVerse>) {
      if (!map.has(v.volume_id)) {
        map.set(v.volume_id, {
          id: String(v.volume_id),
          token: v.volume_lds_url,
          title: v.volume_title,
          books: []
        });
      }
      const books = map.get(v.volume_id)!.books;
      if (!books.find(b => b.id === String(v.book_id))) {
        books.push({ id: String(v.book_id), title: v.book_title });
      }
    }
    return [...map.values()];
  }
);

export default getAllVolumes;
