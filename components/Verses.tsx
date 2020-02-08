import React, {
  FC,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useRef
} from "react";
import { NextPage } from "next";
import { Verse as $Verse, Annotation, Mark, MarkRange } from "../utils/types";
import AnnotationsContext from "../contexts/AnnotationsContext";
import theme from "../data/themes";

const debounce = <T extends (...args: Array<any>) => void>(
  fn: T,
  delay: number
): T => {
  let timerId: number;
  return (((...args: Array<any>) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => fn(...args), delay);
  }) as any) as T;
};

const sortAnnotations = (annotations: Annotation[]) =>
  annotations.sort((a, b) => {
    if (!a.range && !b.range) {
      return 0;
    }
    if (!a.range) {
      return -1;
    }
    if (!b.range) {
      return 1;
    }
    return a.range[0] - b.range[0];
  });

const getAnnotationClasses = (
  annotations: Annotation[],
  allSpeakers: Array<string>
) => {
  const classes = ["py-4"];
  for (const note of annotations) {
    classes.push(
      ...theme(allSpeakers.indexOf(note.speaker), {
        states: ["default"],
        colors: ["bgColor", "textColor"]
      })
    );
  }
  return classes.join(" ");
};

const Verse: FC<{ verse: $Verse }> = ({ verse }) => {
  const sortedAnnotations = sortAnnotations(verse.annotations);
  const text = verse.text;
  const { speakers } = useContext(AnnotationsContext);
  return (
    <blockquote
      data-verse={verse.id}
      key={verse.id}
      className="mx-4 sm:mx-24 content-center text-4xl font-serif my-6 leading-loose text-justify"
    >
      {sortedAnnotations.length ? (
        <>
          {
            sortedAnnotations.reduce<[number, ReactNode[]]>(
              ([charIndex, elements], note, index) => {
                const [from, to = text.length] = note.range ?? [0, text.length];
                return [
                  to,
                  [
                    ...elements,
                    <Fragment key={note.id}>
                      {index === 0 && from !== 0 && <>{verse.number} </>}
                      {text.slice(charIndex, from)}
                      <span
                        data-speaker={note.speaker}
                        className={getAnnotationClasses([note], speakers)}
                      >
                        {index === 0 && from === 0 && <>{verse.number} </>}
                        {text.slice(from, to)}
                      </span>
                      {index === sortedAnnotations.length - 1
                        ? text.slice(to)
                        : null}
                    </Fragment>
                  ]
                ];
              },
              [0, []]
            )[1]
          }
        </>
      ) : (
        <>
          {verse.number} {verse.text}
        </>
      )}
    </blockquote>
  );
};

const getClosestVerseElement = (node: Node) =>
  node.parentElement?.closest("[data-verse]") as HTMLElement | undefined;

const getSelectionRange = () => {
  const selection = document.getSelection();
  return selection?.rangeCount != 0 ? selection?.getRangeAt(0) : null;
};

const getVerseId = (el: HTMLElement) => el.dataset.verse;

const getMarkedVerses = (
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

const getAllTextNodes = (container: HTMLElement): Array<Node> => {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  const nodes: Array<Node> = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }
  return nodes;
};

const getTextOffsetRelativeToContainer = (
  container: HTMLElement,
  markedNode: Node,
  offset: number
) => {
  const textNodes = getAllTextNodes(container);
  let curOffset = 0;
  for (const node of textNodes) {
    if (node === markedNode) {
      return curOffset + offset;
    }
    curOffset += node.textContent?.length || 0;
  }
  throw new Error("markedNode is not a descendant of container");
};

const getMarks = (verses: Array<$Verse>): Array<Mark> => {
  const range = getSelectionRange();
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

const Verses: NextPage<{
  verses: Array<$Verse>;
}> = ({ verses }) => {
  useEffect(() => {
    const handleSelectionChange = debounce(() => {
      console.log({ selectedVerses: getMarks(verses) });
    }, 200);
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  return (
    <div className="w-screen flex-grow flex flex-col overflow-auto">
      {verses.map(verse => (
        <Verse key={verse.number} verse={verse} />
      ))}
    </div>
  );
};

export default Verses;
