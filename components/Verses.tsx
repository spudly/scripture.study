import React, { useEffect } from "react";
import { NextPage } from "next";
import { Verse as $Verse, Mark, VerseSelection } from "../utils/types";
import Verse from "./Verse";
import createVerseSelections from "../utils/createVerseSelections";
import isEmptySelection from "../utils/isEmptySelection";

const Verses: NextPage<{
  verses: Array<Pick<$Verse, "id" | "number" | "text">>;
  marks: Array<Pick<Mark, "id" | "type" | "speakerId" | "verseId" | "range">>;
  setSelections: (selections: Array<VerseSelection>) => void;
  selectMark: (annotatonId: string) => void;
}> = ({ verses, marks, setSelections, selectMark }) => {
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection) {
        if (isEmptySelection(selection)) {
          // setSelections(null);
          return;
        }
        const selections = createVerseSelections(verses, selection);
        if (selections) {
          setSelections(selections);
        }
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [verses]);

  return (
    <div className="mx-4 sm:mx-32 flex-grow flex flex-col overflow-auto min-h-screen justify-center">
      {verses.map(verse => (
        <Verse
          key={verse.id}
          id={verse.id}
          number={verse.number}
          text={verse.text}
          selectMark={selectMark}
          marks={marks.filter(m => m.verseId === verse.id)}
        />
      ))}
    </div>
  );
};

export default Verses;
