import parseReference from "./parseReference";
import allVerses from "../data/verses.json";
import { Verse, RawVerse } from "./types";
import annotateVerse from "./populateVerseAnnotations";

const getVerses = (filter: (v: RawVerse) => boolean): Verse[] =>
  (allVerses as Array<RawVerse>).filter(filter).map<Verse>(v =>
    annotateVerse({
      id: String(v.verse_id),
      token: String(v.verse_number),
      volumeTitle: v.volume_title,
      bookTitle: v.book_title,
      chapter: v.chapter_number,
      number: v.verse_number,
      text: v.scripture_text,
      annotations: []
    })
  );

export default getVerses;
