import parseReference from "./parseReference";
import allVerses from "../data/verses.json";
import { Verse, RawVerse } from "./types";
import annotateVerse from "./annotateVerse";

const getVersesByReference = (ref: string): Verse[] =>
  parseReference(ref as string).flatMap(reference =>
    (allVerses as Array<RawVerse>)
      .filter(
        v =>
          v.book_title?.toLowerCase() === reference.book &&
          v.chapter_number === reference.chapter &&
          (reference.verses == null ||
            reference.verses.includes(v.verse_number))
      )
      .map<Verse>(v => ({
        id: String(v.verse_id),
        token: String(v.verse_number),
        volumeTitle: v.volume_title,
        bookTitle: v.book_title,
        chapter: v.chapter_number,
        number: v.verse_number,
        text: v.scripture_text,
        annotations: []
      }))
      .map(annotateVerse)
  );

export default getVersesByReference;
