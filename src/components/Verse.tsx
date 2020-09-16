import React, {
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
  useContext,
} from 'react';
import classnames from 'classnames';
import {Mark, Verse as $Verse, Speaker} from '../utils/types';
import sortByRange from '../utils/sortByRange';
import {theme} from '../utils/themes';
import {unique} from '@spudly/pushpop';
import {MdRecordVoiceOver} from 'react-icons/md';
import ErrorBoundary from './reusable/ErrorBoundary';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';

const SpeakerIndicator: FC<{
  speakerId: string;
  speakers: Array<Speaker>;
}> = ({speakers, speakerId}) => {
  const speaker = speakers.find((s) => s.id === speakerId);
  if (!speaker) {
    return null;
  }
  const {name, description} = speaker;
  return (
    <div
      className="inline-block w-16 h-16 mx-2 align-middle overflow-hidden select-none"
      data-selection-ignore
      title={[name, description].filter((x) => x != null).join(', ')}
    >
      <div className="flex justify-center">
        <MdRecordVoiceOver />
      </div>
      <div className="text-xs text-center truncate uppercase leading-none flex-1 min-w-0 pt-1">
        {name ?? description}
      </div>
    </div>
  );
};

const VerseFragment: FC<{
  children: ReactNode;
  isVerseNumber?: boolean;
  marks: Array<Pick<Mark, 'id' | 'type' | 'speakerId'>>;
  selectMarks: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds: Array<string>;
  speakerIds: Array<string>;
  speakers: Array<Speaker>;
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
  const isAuthor = hasRole(user, 'author');
  const lastSpeakerId = speakerIds[speakerIds.length - 1];
  const lastMark = marks[marks.length - 1];
  const classes = classnames(
    lastSpeakerId &&
      theme(allSpeakerIds.indexOf(lastSpeakerId), {
        states:
          isVerseNumber || !isAuthor
            ? ['default']
            : selectedMarkIds.includes(lastMark.id)
            ? ['activated']
            : undefined,
        colors: ['bgColor', 'textColor'],
      }),
    'py-4',
    {'cursor-pointer': isAuthor && marks.length !== 0},
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
    isAuthor ? (
      <>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          // TODO: for now, we'll support selecting a single mark. eventually it'd be nice to prompt the user to choose which mark they want to select.
          onClick={(e) => {
            e.stopPropagation();
            const markId = marks[marks.length - 1].id;
            if (e.ctrlKey) {
              selectMarks((markIds) => [...(markIds ?? []), markId]);
            } else {
              selectMarks([markId]);
            }
          }}
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
  id: $Verse['id'];
  number: $Verse['number'];
  text: $Verse['text'];
  selectMarks: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds: Array<string>;
  speakers: Array<Speaker>;
  marks: Array<Mark>;
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
        (allMarks || [])
          .filter((mark) => mark.type === 'speaker')
          .map((mark) => mark.speakerId),
      ),
    [allMarks],
  );
  const sortedMarks = sortByRange(marks);
  const breakpoints = unique([
    0,
    ...sortedMarks.flatMap((note) => note.range ?? []).sort((a, b) => a - b),
  ]);

  const getMarksAt = (index: number) =>
    sortedMarks.filter((mark) => {
      const [start, end = text.length] = mark.range ?? [0, text.length];
      return index >= start && index < end;
    });

  return (
    <blockquote
      data-verse={id}
      key={id}
      className="content-center mb-6 text-4xl leading-loose text-justify font-serif"
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
