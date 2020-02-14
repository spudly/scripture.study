import { Verse as $Verse, Mark, MarkRange } from "./types";
import getClosestVerseElement from "./getClosestVerseElement";
import getMarkedVerses from "./getHighlightedVerses";
import getTextOffsetRelativeToContainer from "./getTextOffsetRelativeToContainer";
import isEmptySelection from "./isEmptySelection";

const createMarks = (
  verses: Array<$Verse>,
  selection: Selection
): Array<Mark> | null => {
  if (isEmptySelection(selection)) {
    return null;
  }
  const range = selection.getRangeAt(0)!;
  const startQuote = getClosestVerseElement(range.startContainer);
  const endQuote = getClosestVerseElement(range.endContainer);
  if (!startQuote || !endQuote) {
    return null;
  }
  const markedVerses = getMarkedVerses(verses, startQuote, endQuote);
  const firstVerse = markedVerses[0];
  const lastVerse = markedVerses[markedVerses.length - 1];
  if (!firstVerse || !lastVerse) {
    return null;
  }
  const firstVerseOffset = Math.max(
    getTextOffsetRelativeToContainer(
      startQuote,
      range?.startContainer,
      range?.startOffset
    ) - `${firstVerse.number} `.length,
    0
  );
  const lastVerseOffset =
    getTextOffsetRelativeToContainer(
      endQuote,
      range?.endContainer,
      range?.endOffset
    ) - `${lastVerse.number} `.length;
  const marks = markedVerses.map(
    (v, index): Mark => {
      const isFirst = index === 0;
      const isLast = index === markedVerses.length - 1;
      return {
        verseId: v.id,
        range:
          isFirst && isLast
            ? lastVerseOffset >= v.text.length
              ? [firstVerseOffset]
              : [firstVerseOffset, lastVerseOffset]
            : isFirst
            ? [firstVerseOffset]
            : isLast
            ? [0, lastVerseOffset]
            : undefined
      };
    }
  );
  if (marks.length) {
    return marks;
  }
  return null;
};

export default createMarks;
