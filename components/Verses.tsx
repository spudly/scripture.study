import React, { useEffect } from "react";
import { NextPage } from "next";
import { Verse as $Verse, Mark, BaseMark } from "../utils/types";
import Verse from "./Verse";
import getMarks from "../utils/createMarks";
import isEmptySelection from "../utils/isEmptySelection";

const Verses: NextPage<{
  verses: Array<$Verse>;
  setMarks: (marks: Array<BaseMark> | null) => void;
  selectMark: (annotatonId: string) => void;
}> = ({ verses, setMarks, selectMark }) => {
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection) {
        if (isEmptySelection(selection)) {
          // setMarks(null);
          return;
        }
        const marks = getMarks(verses, selection);
        if (marks) {
          setMarks(marks);
        }
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  return (
    <div className="mx-4 sm:mx-32 flex-grow flex flex-col overflow-auto min-h-screen justify-center">
      {verses.map(verse => (
        <Verse key={verse.number} verse={verse} selectMark={selectMark} />
      ))}
    </div>
  );
};

export default Verses;
