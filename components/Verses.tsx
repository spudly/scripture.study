import React, { useEffect } from "react";
import { NextPage } from "next";
import { Verse as $Verse, Mark, MarkRange, DrawerView } from "../utils/types";
import debounce from "../utils/debounce";
import Verse from "./Verse";
import getMarks from "../utils/createMarks";

const Verses: NextPage<{
  verses: Array<$Verse>;
  setDrawerView: (view: DrawerView) => void;
}> = ({ verses, setDrawerView }) => {
  useEffect(() => {
    const handleSelectionChange = debounce(() => {
      const selection = window.getSelection();
      if (selection) {
        const marks = getMarks(verses, selection);
        if (marks) {
          setDrawerView({ type: "CREATE_ANNOTATIONS", marks });
        }
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
