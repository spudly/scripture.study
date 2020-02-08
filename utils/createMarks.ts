import { Verse as $Verse, Mark, MarkRange } from "./types";
import getClosestVerseElement from "./getClosestVerseElement";
import getMarkedVerses from "./getHighlightedVerses";
import getTextOffsetRelativeToContainer from "./getTextOffsetRelativeToContainer";

const createMarks = (
  verses: Array<$Verse>,
  selection: Selection
): Array<Mark> => {
  const range = selection.rangeCount != 0 ? selection?.getRangeAt(0) : null;
  if (!range) {
    return [];
  }
  const startQuote = getClosestVerseElement(range?.startContainer);
  const endQuote = getClosestVerseElement(range?.endContainer);
  if (!startQuote || !endQuote) {
    return [];
  }
  const markedVerses = getMarkedVerses(verses, startQuote, endQuote);
  const firstVerse = markedVerses[0];
  const lastVerse = markedVerses[markedVerses.length - 1];
  const firstVerseRange: MarkRange = [
    getTextOffsetRelativeToContainer(
      startQuote,
      range?.startContainer,
      range?.startOffset
    ) - `${firstVerse.number} `.length
  ];
  const lastVerseRange: MarkRange = [
    0,
    getTextOffsetRelativeToContainer(
      endQuote,
      range?.endContainer,
      range?.endOffset
    ) - `${lastVerse.number} `.length
  ];
  return markedVerses.map(
    (v, index): Mark => ({
      verseId: v.id,
      range:
        index === 0
          ? firstVerseRange
          : index === markedVerses.length - 1
          ? lastVerseRange
          : undefined
    })
  );
};

export default createMarks;
