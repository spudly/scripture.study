import React, { FC, ReactNode, useMemo, useEffect } from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { Verse } from "../utils/types";
import Verses from "../components/Verses";
import AnnotationsContext from "../contexts/AnnotationsContext";
import SpeakerLegend from "../components/SpeakerLegend";
import SpeakerHeader from "../components/SpeakerHeader";
import unique from "../utils/unique";

const Ref: NextPage<{
  verses: Array<Verse>;
}> = ({ verses }) => {
  const contextValue = useMemo(
    () => ({
      speakers: unique(
        verses
          .flatMap((v: Verse) => v.annotations)
          .filter(note => note.type === "speaker")
          .map(note => note.speaker)
      )
    }),
    [verses]
  );

  useEffect(() => {
    console.log("page mounted");
  }, []);

  return (
    <>
      <AnnotationsContext.Provider value={contextValue}>
        <div className="flex flex-col h-screen">
          <SpeakerHeader />
          <Verses verses={verses} />
        </div>
        <SpeakerLegend />
      </AnnotationsContext.Provider>
    </>
  );
};

Ref.getInitialProps = async ({ query: { ref } }) => {
  const res = await fetch(
    `http://localhost:3000/api/byRef/${encodeURIComponent(ref as string)}`
  );
  if (res.ok) {
    const verses = await res.json();
    return { verses };
  }
  throw new Error(res.statusText);
};

export default Ref;
