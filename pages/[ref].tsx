import React, { FC, ReactNode, useMemo, useEffect } from "react";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { Verse } from "../utils/types";
import Verses from "../components/Verses";
import AnnotationsContext from "../contexts/AnnotationsContext";
import SpeakerLegend from "../components/SpeakerLegend";
import SpeakerHeader from "../components/SpeakerHeader";
import getVersesByReference from "../utils/getVersesByReference";
import { useRouter } from "next/dist/client/router";

// TODO: move to pure-fns
const unique = <ITEM extends any, LIST extends Array<ITEM>>(list: LIST): LIST =>
  [...new Set(list)] as LIST;

const Ref: NextPage<{
  /* verses: Array<AnnotatedVerse> */
  reference: string;
}> = ({
  /*verses*/
  reference
}) => {
  const verses = getVersesByReference(reference as string);
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
  return { reference: ref as string };
  // const res = await fetch(
  //   `http://localhost:3000/api/ref/${encodeURIComponent(ref as string)}`
  // );
  // if (res.ok) {
  //   const verses = await res.json();
  //   return { verses };
  // }
  // throw new Error(res.statusText);
};

export default Ref;
