import React, {Dispatch, FC, ReactNode, SetStateAction, useMemo} from 'react';
import {isNotNil, unique} from '@spudly/pushpop';
import {MarkRecord, PersonRecord, VerseRecord} from '../types';
import sortByStartIndex from '../utils/sortByStartIndex';
import VerseFragment from './VerseFragment';

const Verse: FC<{
  id: VerseRecord['id'];
  number: VerseRecord['number'];
  text: VerseRecord['text'];
  selectMarks?: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds?: Array<string>;
  speakers: Array<PersonRecord>;
  marks: Array<MarkRecord>;
}> = ({
  id,
  text,
  number,
  selectMarks,
  selectedMarkIds,
  speakers,
  marks: allMarks,
}) => {
  const marks = allMarks.filter((m) => m.verseId === id);
  const speakerIds = useMemo(
    () =>
      unique(
        (allMarks || []).flatMap((mark) => {
          if (mark.type === 'speaker') {
            return [mark.speakerId];
          }
          return [];
        }),
      ),
    [allMarks],
  );
  const sortedMarks = sortByStartIndex(marks);
  const breakpoints = unique([
    0,
    ...sortedMarks
      .flatMap((mark) => [mark.startIndex, mark.endIndex])
      .filter(isNotNil)
      .sort((a, b) => a - b),
  ]);

  const getMarksAt = (index: number) =>
    sortedMarks.filter((mark) => {
      const startIndex = mark.startIndex ?? 0;
      const endIndex = mark.endIndex ?? text.length;
      return index >= startIndex && index < endIndex;
    });

  return (
    <blockquote
      data-verse={id}
      key={id}
      className="content-center mb-rel-6 leading-loose text-justify font-serif"
    >
      <span className="select-none">{number} </span>
      {breakpoints.reduce((elements, breakpoint, index) => {
        const nextBreakpoint = breakpoints[index + 1] ?? text.length;
        const [from, to = text.length] = [breakpoint, nextBreakpoint];
        return [
          ...elements,
          <VerseFragment
            key={breakpoint}
            marks={getMarksAt(breakpoint)}
            selectMarks={selectMarks}
            selectedMarkIds={selectedMarkIds}
            speakerIds={speakerIds}
            speakers={speakers}
          >
            {text.slice(from, to)}
          </VerseFragment>,
        ];
      }, [] as Array<ReactNode>)}
    </blockquote>
  );
};

export default Verse;
