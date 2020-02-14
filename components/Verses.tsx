import React, { useEffect } from "react";
import { NextPage } from "next";
import { Verse as $Verse, Mark } from "../utils/types";
import debounce from "../utils/debounce";
import Verse from "./Verse";
import getMarks from "../utils/createMarks";
import isEmptySelection from "../utils/isEmptySelection";

const Verses: NextPage<{
  verses: Array<$Verse>;
  setMarks: (marks: Array<Mark> | null) => void;
}> = ({ verses, setMarks }) => {
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
    <div className="mx-4 sm:mx-24 flex-grow flex flex-col overflow-auto min-h-screen justify-center">
      {verses.map(verse => (
        <Verse key={verse.number} verse={verse} />
      ))}
    </div>
  );
};

export default Verses;
