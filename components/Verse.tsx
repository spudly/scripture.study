import React, { FC, ReactNode, useContext } from "react";
import classnames from "classnames";
import { Mark, Verse as $Verse } from "../utils/types";
import MarksContext from "../contexts/MarksContext";
import sortMarks from "../utils/sortMarks";
import { theme } from "../data/themes";
import unique from "../utils/unique";
import last from "../utils/last";

const VerseFragment: FC<{
  marks: Array<Mark>;
  children: ReactNode;
  isVerseNumber?: boolean;
  selectMark: (markid: string) => void;
}> = ({ isVerseNumber = false, marks, children, selectMark }) => {
  const { speakers: allSpeakers } = useContext(MarksContext);
  const speakerIds = marks
    .filter(({ type }) => type === "speaker")
    .map(({ speaker }) => speaker)
    .join(" ");
  const lastMark: Mark | undefined = marks[marks.length - 1];
  // TODO: for now, we'll support selecting a single mark. eventually it'd be nice to prompt the user to choose which mark they want to select.
  const classes = classnames(
    lastMark &&
      theme(allSpeakers.indexOf(lastMark.speaker), {
        states: isVerseNumber ? ["default"] : undefined,
        colors: ["bgColor", "textColor"]
      }),
    "py-4",
    { "cursor-pointer": lastMark != null }
  );
  return lastMark ? (
    <a data-speakers={speakerIds} onClick={() => selectMark(lastMark?.id)}>
      <mark className={classes}>{children}</mark>
    </a>
  ) : (
    <>{children}</>
  );
};

const Verse: FC<{
  verse: $Verse;
  selectMark: (markid: string) => void;
}> = ({ verse, selectMark }) => {
  const sortedMarks = sortMarks(verse.marks);
  const text = verse.text;
  const { speakers } = useContext(MarksContext);
  const breakpoints = unique([
    0,
    ...sortedMarks.flatMap(note => note.range ?? []).sort((a, b) => a - b)
  ]);

  const getMarksAt = (index: number) =>
    sortedMarks.filter(
      ({ range: [start, end = text.length] = [0, text.length] }) =>
        index >= start && index < end
    );

  return (
    <blockquote
      data-verse={verse.id}
      key={verse.id}
      className="content-center text-4xl font-serif my-6 leading-loose text-justify"
    >
      <VerseFragment
        marks={getMarksAt(0)}
        isVerseNumber
        selectMark={selectMark}
      >
        {verse.number}{" "}
      </VerseFragment>
      {breakpoints.reduce((elements, breakpoint, index) => {
        const nextBreakpoint = breakpoints[index + 1] ?? text.length;
        const [from, to = text.length] = [breakpoint, nextBreakpoint];
        const notes = getMarksAt(breakpoint);
        return [
          ...elements,
          <VerseFragment key={breakpoint} marks={notes} selectMark={selectMark}>
            {text.slice(from, to)}
          </VerseFragment>
        ];
      }, [] as Array<ReactNode>)}
    </blockquote>
  );
};

export default Verse;
