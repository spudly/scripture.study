import { Verse, Annotation } from "./types";
import annotations from "../data/annotations.json";

export const annotateVerse = (verse: Verse): Verse => ({
  ...verse,
  annotations: (annotations as Array<Annotation>).filter(
    ({ verseId }) => verseId === verse.id
  )
});

export default annotateVerse;
