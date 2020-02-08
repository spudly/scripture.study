import React, { FC, Fragment, ReactNode, useContext } from "react";
import { Annotation, Verse as $Verse } from "../utils/types";
import AnnotationsContext from "../contexts/AnnotationsContext";
import sortAnnotations from "../utils/sortAnnotations";
import theme from "../data/themes";

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

export default Verse;
