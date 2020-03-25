import React, {
  FC,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction
} from "react";
import classnames from "classnames";
import { Mark, Verse as $Verse } from "../utils/types";
import sortByRange from "../utils/sortByRange";
import { theme } from "../data/themes";
import unique from "../utils/unique";

const VerseFragment: FC<{
  children: ReactNode;
  isVerseNumber?: boolean;
  marks: Array<Pick<Mark, "id" | "type" | "speakerId">>;
  selectMarks: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds: Array<string>;
  speakerIds: Array<string>;
}> = ({
  isVerseNumber = false,
  children,
  selectMarks,
  marks,
  selectedMarkIds,
  speakerIds: allSpeakerIds
}) => {
  const speakerIds = marks.flatMap(m =>
    m.type === "speaker" ? [m.speakerId] : []
  );
  const lastSpeakerId = speakerIds[speakerIds.length - 1];
  const lastMark = marks[marks.length - 1];
  const classes = classnames(
    lastSpeakerId &&
      theme(allSpeakerIds.indexOf(lastSpeakerId), {
        states: isVerseNumber
          ? ["default"]
          : selectedMarkIds.includes(lastMark.id)
          ? ["activated"]
          : undefined,
        colors: ["bgColor", "textColor"]
      }),
    "py-4",
    { "cursor-pointer": marks.length != 0 }
  );
  return marks.length ? (
    <a
      data-speaker-ids={speakerIds.join(" ")}
      // TODO: for now, we'll support selecting a single mark. eventually it'd be nice to prompt the user to choose which mark they want to select.
      onClick={e => {
        e.stopPropagation();
        const markId = marks[marks.length - 1].id;
        if (e.ctrlKey) {
          selectMarks(markIds => [...(markIds ?? []), markId]);
        } else {
          selectMarks([markId]);
        }
      }}
    >
      <mark className={classes}>{children}</mark>
    </a>
  ) : (
    <>{children}</>
  );
};

const Verse: FC<{
  id: $Verse["id"];
  number: $Verse["number"];
  text: $Verse["text"];
  marks: Array<Mark>;
  selectMarks: Dispatch<SetStateAction<string[]>>;
  selectedMarkIds: Array<string>;
  speakerIds: Array<string>;
}> = ({
  id,
  text,
  number,
  marks,
  selectMarks,
  selectedMarkIds,
  speakerIds
}) => {
  const sortedMarks = sortByRange(marks);
  const breakpoints = unique([
    0,
    ...sortedMarks.flatMap(note => note.range ?? []).sort((a, b) => a - b)
  ]);

  const getMarksAt = (index: number) =>
    sortedMarks.filter(mark => {
      const [start, end = text.length] = mark.range ?? [0, text.length];
      return index >= start && index < end;
    });

  return (
    <blockquote
      data-verse={id}
      key={id}
      className="content-center text-4xl font-serif mb-6 leading-loose text-justify"
    >
      <span>{number} </span>
      {breakpoints.reduce((elements, breakpoint, index) => {
        const nextBreakpoint = breakpoints[index + 1] ?? text.length;
        const [from, to = text.length] = [breakpoint, nextBreakpoint];
        const marks = getMarksAt(breakpoint);
        return [
          ...elements,
          <VerseFragment
            key={breakpoint}
            marks={getMarksAt(breakpoint)}
            selectMarks={selectMarks}
            selectedMarkIds={selectedMarkIds}
            speakerIds={speakerIds}
          >
            {text.slice(from, to)}
          </VerseFragment>
        ];
      }, [] as Array<ReactNode>)}
    </blockquote>
  );
};

export default Verse;
