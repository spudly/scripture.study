import React, {
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
  Suspense,
  useMemo,
} from 'react';
import classnames from 'classnames';
import {Mark, Verse as $Verse, Person, Resource} from '../utils/types';
import sortByRange from '../utils/sortByRange';
import {theme} from '../utils/themes';
import unique from '../utils/unique';
import {MdRecordVoiceOver} from 'react-icons/md';

const SpeakerIndicator: FC<{
  speakerId: string;
  speakersResource: Resource<Array<Person>>;
}> = ({speakersResource, speakerId}) => {
  const speakers = speakersResource.read();
  const speaker = speakers.find((s) => s.id === speakerId);
  if (!speaker) {
    throw new Error(`Missing Speaker: [${speakerId}]`);
  }
  const {name, description} = speaker;
  return (
    <div
      className="inline-block w-16 h-16 mx-2 align-middle overflow-hidden select-none"
      data-selection-ignore
      title={description ? `${name}, ${description}` : name}
    >
      <div className="flex justify-center">
        <MdRecordVoiceOver />
      </div>
      <div className="text-xs text-center truncate uppercase leading-none flex-1 min-w-0 pt-1">
        {name}
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
  speakersResource: Resource<Array<Person>>;
}> = ({
  isVerseNumber = false,
  children,
  selectMarks,
  marks,
  selectedMarkIds,
  speakerIds: allSpeakerIds,
  speakersResource,
}) => {
  const speakerIds = marks.flatMap((m) =>
    m.type === 'speaker' ? [m.speakerId] : [],
  );
  const lastSpeakerId = speakerIds[speakerIds.length - 1];
  const lastMark = marks[marks.length - 1];
  const classes = classnames(
    lastSpeakerId &&
      theme(allSpeakerIds.indexOf(lastSpeakerId), {
        states: isVerseNumber
          ? ['default']
          : selectedMarkIds.includes(lastMark.id)
          ? ['activated']
          : undefined,
        colors: ['bgColor', 'textColor'],
      }),
    'py-4',
    {'cursor-pointer': marks.length !== 0},
  );
  return marks.length ? (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        data-speaker-ids={speakerIds.join(' ')}
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
        <mark className={classes}>
          <Suspense fallback={null}>
            {speakerIds.map((id) => (
              <SpeakerIndicator
                key={id}
                speakerId={id}
                speakersResource={speakersResource}
              />
            ))}
          </Suspense>

          {children}
        </mark>
      </a>
    </>
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
  speakersResource: Resource<Array<Person>>;
  marksResource: Resource<Array<Mark>>;
}> = ({
  id,
  text,
  number,
  selectMarks,
  selectedMarkIds,
  speakersResource,
  marksResource,
}) => {
  const allMarks = marksResource.read(); // TODO: this blocks the verse until marks are loaded. figure out how to render the verse even if we don't know what marks it has yet
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
            speakersResource={speakersResource}
          >
            {text.slice(from, to)}
          </VerseFragment>,
        ];
      }, [] as Array<ReactNode>)}
    </blockquote>
  );
};

export default Verse;
