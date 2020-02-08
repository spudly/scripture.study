import { Verse as $Verse } from "./types";
import getVerseId from "./getVerseIdFromElement";

const getHighlightedVerses = (
  verses: Array<$Verse>,
  startContainer: HTMLElement,
  endContainer: HTMLElement
) => {
  const startId = getVerseId(startContainer);
  const endId = getVerseId(endContainer);
  if (!startId || !endId) {
    return [];
  }
  const startVerseIndex = verses.findIndex(v => v.id === startId);
  const endVerseIndex = verses.findIndex(v => v.id === endId);
  return verses.slice(startVerseIndex, endVerseIndex + 1);
};

export default getHighlightedVerses;
