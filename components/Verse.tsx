import React, { FC, Fragment, ReactNode, useContext } from "react";
import { Annotation, Verse as $Verse } from "../utils/types";
import AnnotationsContext from "../contexts/AnnotationsContext";
import sortAnnotations from "../utils/sortAnnotations";
import { theme } from "../data/themes";
import unique from "../utils/unique";

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

const Verse: FC<{
  verse: $Verse;
}> = ({ verse }) => {
  const sortedAnnotations = sortAnnotations(verse.annotations);
  const text = verse.text;
  const { speakers } = useContext(AnnotationsContext);
  const breakpoints = unique([
    0,
    ...sortedAnnotations.flatMap(note => note.range ?? []).sort((a, b) => a - b)
  ]);

  const getAnnotationsAt = (index: number) =>
    sortedAnnotations.filter(
      ({ range: [start, end = text.length] = [0, text.length] }) =>
        index >= start && index < end
    );
  return (
    <blockquote
      data-verse={verse.id}
      key={verse.id}
      className="content-center text-4xl font-serif my-6 leading-loose text-justify"
    >
      <span className={getAnnotationClasses(getAnnotationsAt(0), speakers)}>
        {verse.number}{" "}
      </span>
      {breakpoints.reduce((elements, breakpoint, index) => {
        const nextBreakpoint = breakpoints[index + 1] ?? text.length;
        const [from, to = text.length] = [breakpoint, nextBreakpoint];
        const notes = getAnnotationsAt(breakpoint);
        const speakerIds = notes
          .filter(({ type }) => type === "speaker")
          .map(({ speaker }) => speaker)
          .join(" ");
        return [
          ...elements,
          <Fragment key={breakpoint}>
            <span
              key={breakpoint}
              data-speakers={speakerIds}
              className={getAnnotationClasses(notes, speakers)}
            >
              {text.slice(from, to)}
            </span>
          </Fragment>
        ];
      }, [] as Array<ReactNode>)}
    </blockquote>
  );
};

export default Verse;
