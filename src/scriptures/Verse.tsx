import React, {
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
  useContext,
} from 'react';
import classnames from 'classnames';
import {MarkRecord, VerseRecord, PersonRecord, ID} from '../types';
import sortByStartIndex from '../utils/sortByStartIndex';
import {theme} from '../utils/themes';
import {isNotNil, unique} from '@spudly/pushpop';
import {MdRecordVoiceOver} from 'react-icons/md';
import ErrorBoundary from '../widgets/ErrorBoundary';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import {Link} from 'react-router-dom';
import {serializePerson, serializePersonJsx} from '../utils/serializePerson';

const SpeakerIndicator: FC<{
  speakerId: ID;
  speakers: Array<PersonRecord>;
}> = ({speakers, speakerId}) => {
  const speaker = speakers.find((s) => s.id === speakerId);
  if (!speaker) {
    return null;
  }
  return (
    <Link
      to={`/people/${speakerId}`}
      className="inline-flex flex-col justify-center w-rel-8 h-rel-8 mx-rel-1 align-middle overflow-hidden select-none transform hover:scale-110"
      data-selection-ignore
      title={serializePerson(speaker)}
    >
      <div className="flex justify-center">
        <MdRecordVoiceOver />
      </div>
      <div className="text-rel-3xs text-center truncate uppercase leading-none min-w-0 pt-1">
        {serializePersonJsx(speaker)}
      </div>
    </Link>
  );
};

const VerseFragment: FC<{
  children: ReactNode;
  isVerseNumber?: boolean;
  marks: Array<MarkRecord>;
  selectMarks?: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds?: Array<string>;
  speakerIds: Array<string>;
  speakers: Array<PersonRecord>;
}> = ({
  isVerseNumber = false,
  children,
  selectMarks,
  marks,
  selectedMarkIds,
  speakerIds: allSpeakerIds,
  speakers,
}) => {
  const speakerIds = marks.flatMap((m) =>
    m.type === 'speaker' ? [m.speakerId] : [],
  );
  const user = useContext(UserContext);
  const isAuthor = hasRole('author', user);
  const lastSpeakerId = speakerIds[speakerIds.length - 1];
  const lastMark = marks[marks.length - 1];
  const classes = classnames(
    lastSpeakerId &&
      theme(allSpeakerIds.indexOf(lastSpeakerId), {
        states:
          isVerseNumber || !isAuthor || !selectMarks
            ? ['default']
            : selectedMarkIds?.includes(lastMark.id)
            ? ['activated']
            : undefined,
        colors: ['bgColor', 'textColor'],
      }),
    'py-rel-2',
    {'cursor-pointer': isAuthor && marks.length !== 0 && selectMarks},
  );
  const mark = marks.length ? (
    <mark className={classes}>
      <ErrorBoundary grow>
        {speakerIds.map((id) => (
          <SpeakerIndicator key={id} speakerId={id} speakers={speakers} />
        ))}
      </ErrorBoundary>
      {children}
    </mark>
  ) : null;
  return mark ? (
    isAuthor && selectMarks ? (
      <>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          // TODO: for now, we'll support selecting a single mark. eventually it'd be nice to prompt the user to choose which mark they want to select.
          onClick={
            selectMarks
              ? (e) => {
                  e.stopPropagation();
                  const markId = marks[marks.length - 1].id;
                  if (e.ctrlKey) {
                    selectMarks((markIds) => [...(markIds ?? []), markId]);
                  } else {
                    selectMarks([markId]);
                  }
                }
              : undefined
          }
        >
          {mark}
        </a>
      </>
    ) : (
      mark
    )
  ) : (
    <>{children}</>
  );
};

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
