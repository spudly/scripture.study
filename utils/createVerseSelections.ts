import { Verse as $Verse, VerseSelection } from "./types";
import getClosestVerseElement from "./getClosestVerseElement";
import getSelectedVerses from "./getSelectedVerses";
import getTextOffsetRelativeToContainer from "./getTextOffsetRelativeToContainer";
import isEmptySelection from "./isEmptySelection";

const createVerseSelections = (
  verses: Array<Pick<$Verse, "id" | "number" | "text">>,
  selection: Selection
): Array<VerseSelection> | null => {
  if (isEmptySelection(selection)) {
    return null;
  }
  const range = selection.getRangeAt(0)!;
  const startQuote = getClosestVerseElement(range.startContainer);
  const endQuote = getClosestVerseElement(range.endContainer);
  if (!startQuote || !endQuote) {
    return null;
  }
  const selectedVerses = getSelectedVerses(verses, startQuote, endQuote);
  const firstVerse = selectedVerses[0];
  const lastVerse = selectedVerses[selectedVerses.length - 1];
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
  const verseSelections = selectedVerses.map(
    (v, index): VerseSelection => {
      const isFirst = index === 0;
      const isLast = index === selectedVerses.length - 1;
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
  if (verseSelections.length) {
    return verseSelections;
  }
  return null;
};

export default createVerseSelections;
