import { Verse, Mark } from "./types";
import marks from "../data/marks.json";

export const populateVerseMarks = (verse: Verse): Verse => ({
  ...verse,
  marks: (marks as Array<Mark>).filter(({ verseId }) => verseId === verse.id)
});

export default populateVerseMarks;
