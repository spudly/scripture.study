import React, { useMemo, useState, FC } from "react";
import fetch from "isomorphic-unfetch";
import {
  Verse,
  Mark,
  ApiResponse,
  SlimBookAndChapter,
  SlimVerse
} from "../utils/types";
import Verses from "../components/Verses";
import MarksContext from "../contexts/MarksContext";
import SpeakerLegend from "../components/SpeakerLegend";
import unique from "../utils/unique";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { VerseSelection } from "../utils/types";
import Pagination from "../components/Pagination";
import DeleteMarkButton from "./DeleteMarkButton";
import CreateMarkButton from "../components/CreateMarkButton";
import { NextPage } from "next";

const getUrl = ({
  book,
  chapter,
  verse = undefined
}: SlimBookAndChapter & { verse?: SlimVerse }) =>
  `/${book.title.replace(/\s/g, "")}${chapter.number}${
    verse?.number ? `.${verse?.number}` : ""
  }`;

const fetchVerses = async (
  ref: string
): Promise<{ verses: Array<Verse>; prev?: string; next?: string }> => {
  const res = await fetch(
    `http://localhost:3000/api/ref/${encodeURIComponent(ref as string)}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const result: ApiResponse = await res.json();
  switch (result.type) {
    case "chapter": {
      const { prev, next } = result;
      return { verses: result.verses, prev: getUrl(prev), next: getUrl(next) };
    }
    case "verses":
      return { verses: result.verses };
    case "verse": {
      const { prev, next } = result;
      return { verses: [result.verse], prev: getUrl(prev), next: getUrl(next) };
    }
    default:
      return { verses: [] };
  }
};

const api = {
  async createMarks(newMarks: Array<Mark>) {
    const response = await fetch("/api/marks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMarks)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  },
  async deleteMark(id: string) {
    const response = await fetch(`/api/marks/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
};

const USE_REFERENCE_QUERY = gql`
  query reference($reference: String!) {
    reference(reference: $reference) {
      prev
      next
      verses {
        id
        number
        text
      }
      marks {
        id
        type
        speakerId
        verseId
        range
      }
    }
  }
`;

const CREATE_MARKS_QUERY = gql`
  mutation createMarks($marks: [MarksInput!]!) {
    createMarks(marks: $marks) {
      success
    }
  }
`;

const DELETE_MARK_QUERY = gql`
  mutation deleteMark($id: String!) {
    deleteMark(id: $id) {
      success
    }
  }
`;

type Props = {
  reference: string;
};

const Reference: FC<Props> = ({ reference }) => {
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkId, setSelectedMarkId] = useState<string | null>(null);
  const {
    data: {
      reference: {
        prev = undefined,
        next = undefined,
        verses = [],
        marks = []
      } = {}
    } = {},
    refetch
  } = useQuery<{
    reference: {
      prev?: string;
      next?: string;
      verses: Array<Pick<Verse, "id" | "number" | "text">>;
      marks: Array<
        Pick<Mark, "id" | "type" | "speakerId" | "verseId" | "range">
      >;
    };
  }>(USE_REFERENCE_QUERY, { variables: { reference } });
  const [createMarks] = useMutation(CREATE_MARKS_QUERY, {
    refetchQueries: ["reference"],
    awaitRefetchQueries: true
  });
  const [deleteMark] = useMutation(DELETE_MARK_QUERY, {
    refetchQueries: ["reference"],
    awaitRefetchQueries: true
  });

  const contextValue = useMemo(
    () => ({
      speakerIds: unique(
        (marks || [])
          .filter(mark => mark.type === "speaker")
          .map(mark => mark.speakerId)
      )
    }),
    [marks]
  );

  if (!verses) {
    return <>loading...</>;
  }

  return (
    <>
      {prev && <Pagination type="prev" href={prev} />}
      <MarksContext.Provider value={contextValue}>
        <div className="fixed top-0 left-0 ml-4">
          <SpeakerLegend />
        </div>
        <Verses
          verses={verses}
          marks={marks}
          setSelections={setSelections}
          selectMark={setSelectedMarkId}
        />
      </MarksContext.Provider>
      {next && <Pagination type="next" href={next} />}
      <div className="fixed bottom-0 right-0 pr-4 pb-4">
        {selectedMarkId && (
          <div>
            <DeleteMarkButton
              selectedMarkId={selectedMarkId}
              deleteMark={async (id: string) => {
                await deleteMark({ variables: { id } });
                // refetch();
              }}
            />
          </div>
        )}
        {selections.length ? (
          <div>
            <CreateMarkButton
              selections={selections}
              createMarks={async (newMarks: Array<Mark>) => {
                await createMarks({ variables: { marks: newMarks } });
                setSelections([]);
                // refetch();
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Reference;
