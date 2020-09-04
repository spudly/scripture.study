import {Verse as $Verse, VerseSelection} from './types';
import isEmptySelection from './isEmptySelection';

const getVerseId = (el: HTMLElement) => el.dataset.verse;

const getAllTextNodes = (container: HTMLElement): Array<Text> => {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );
  const nodes: Array<Text> = [];
  let node: Text | null;
  while ((node = walker.nextNode() as Text)) {
    nodes.push(node);
  }
  return nodes;
};

const shouldIgnoreTextNode = (node: Text) =>
  node.parentElement!.closest('[data-selection-ignore]');

const getTextOffsetRelativeToContainer = (
  container: HTMLElement,
  markedNode: Node,
  offset: number,
) => {
  const textNodes = getAllTextNodes(container);
  let curOffset = 0;
  for (const node of textNodes) {
    if (!shouldIgnoreTextNode(node)) {
      if (node === markedNode) {
        return curOffset + offset;
      }
      curOffset += node.textContent?.length || 0;
    }
  }
  throw new Error('markedNode is not a descendant of container');
};

const getClosestVerseElement = (node: Node) =>
  node.parentElement?.closest('[data-verse]') as HTMLElement | undefined;

const getSelectedVerses = <
  VERSE extends Pick<$Verse, 'id' | 'volumeId' | 'chapterId'>
>(
  verses: Array<VERSE>,
  startContainer: HTMLElement,
  endContainer: HTMLElement,
): Array<VERSE> => {
  const startId = getVerseId(startContainer);
  const endId = getVerseId(endContainer);
  if (!startId || !endId) {
    return [];
  }
  const startVerseIndex = verses.findIndex((v) => v.id === startId);
  const endVerseIndex = verses.findIndex((v) => v.id === endId);
  return verses.slice(startVerseIndex, endVerseIndex + 1);
};

const createVerseSelections = (
  verses: Array<
    Pick<$Verse, 'id' | 'chapterId' | 'volumeId' | 'number' | 'text'>
  >,
  selection: Selection,
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
      range?.startOffset,
    ) - `${firstVerse.number} `.length,
    0,
  );
  const lastVerseOffset =
    getTextOffsetRelativeToContainer(
      endQuote,
      range?.endContainer,
      range?.endOffset,
    ) - `${lastVerse.number} `.length;
  const verseSelections = selectedVerses.map(
    (v, index): VerseSelection => {
      const isFirst = index === 0;
      const isLast = index === selectedVerses.length - 1;
      return {
        verseId: v.id,
        chapterId: v.chapterId,
        volumeId: v.volumeId,
        range:
          isFirst && isLast
            ? lastVerseOffset >= v.text.length
              ? [firstVerseOffset]
              : [firstVerseOffset, lastVerseOffset]
            : isFirst
            ? [firstVerseOffset]
            : isLast
            ? [0, lastVerseOffset]
            : null,
      };
    },
  );
  if (verseSelections.length) {
    return verseSelections;
  }
  return null;
};

export default createVerseSelections;
