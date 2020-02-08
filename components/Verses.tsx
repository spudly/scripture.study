import React, { useEffect } from "react";
import { NextPage } from "next";
import { Verse as $Verse, Mark, MarkRange } from "../utils/types";
import debounce from "../utils/debounce";
import Verse from "./Verse";
import getMarks from "../utils/createMarks";

const Verses: NextPage<{
  verses: Array<$Verse>;
}> = ({ verses }) => {
  useEffect(() => {
    const handleSelectionChange = debounce(() => {
      const selection = window.getSelection();
      if (selection) {
        console.log({ selectedVerses: getMarks(verses, selection) });
      }
    }, 200);
    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  return (
    <div className="w-screen flex-grow flex flex-col overflow-auto">
      {verses.map(verse => (
        <Verse key={verse.number} verse={verse} />
      ))}
    </div>
  );
};

export default Verses;
