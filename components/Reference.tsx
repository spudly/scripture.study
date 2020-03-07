import React, { useMemo, useState, FC, SyntheticEvent } from "react";
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
import DeleteMarksButton from "./DeleteMarksButton";
import EditMarkButton from "./EditMarksButton";
import CreateMarkButton from "../components/CreateMarkButton";
import Spinner from "./Spinner";

const getUrl = ({
  book,
  chapter,
  verse = undefined
}: SlimBookAndChapter & { verse?: SlimVerse }) =>
  `/${book.title.replace(/\s/g, "")}${chapter.number}${
    verse?.number ? `.${verse?.number}` : ""
  }`;

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
  mutation createMarks($marks: [NewMark!]!) {
    createMarks(marks: $marks) {
      success
    }
  }
`;

const UPDATE_MARKS_QUERY = gql`
  mutation updateMarks($marks: [MarkUpdate!]!) {
    updateMarks(marks: $marks) {
      success
    }
  }
`;

const DELETE_MARK_QUERY = gql`
  mutation deleteMarks($ids: [String!]!) {
    deleteMarks(ids: $ids) {
      success
    }
  }
`;

type Props = {
  reference: string;
};

type UseReferenceQueryResult = {
  reference: {
    prev?: string;
    next?: string;
    verses: Array<Pick<Verse, "id" | "number" | "text">>;
    marks: Array<Mark>;
  };
};

const Reference: FC<Props> = ({ reference }) => {
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);
  const {
    data: {
      reference: {
        prev = undefined,
        next = undefined,
        verses = [],
        marks = []
      } = {}
    } = {}
  } = useQuery<UseReferenceQueryResult>(USE_REFERENCE_QUERY, {
    variables: { reference }
  });
  const selectedMarks = marks.filter(m => selectedMarkIds.includes(m.id));
  const [createMarks, { loading: isCreating }] = useMutation(
    CREATE_MARKS_QUERY,
    {
      refetchQueries: ["reference"],
      awaitRefetchQueries: true
    }
  );
  const [deleteMarks, { loading: isDeleting }] = useMutation(
    DELETE_MARK_QUERY,
    {
      refetchQueries: ["reference"],
      awaitRefetchQueries: true,
      onCompleted: () => setSelectedMarkIds([])
    }
  );
  const [updateMarks, { loading: isUpdating }] = useMutation(
    UPDATE_MARKS_QUERY,
    {
      refetchQueries: ["reference"],
      awaitRefetchQueries: true,
      onCompleted: () => setSelectedMarkIds([])
    }
  );

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
    return <Spinner grow />;
  }

  return (
    <div
      className="flex-1 flex flex-col"
      onClick={e => {
        const selection = window.getSelection();
        if (selection?.type !== "Range") {
          window.getSelection()?.removeAllRanges();
          setSelections([]);
        }
        setSelectedMarkIds([]);
      }}
    >
      {/* {prev && <Pagination type="prev" href={prev} />} */}
      <MarksContext.Provider value={contextValue}>
        <SpeakerLegend />
        <Verses
          verses={verses}
          marks={marks}
          setSelections={setSelections}
          selectMarks={setSelectedMarkIds}
          selectedMarkIds={selectedMarkIds}
        />
      </MarksContext.Provider>
      {/* {next && <Pagination type="next" href={next} />} */}
      <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
        {selectedMarks.length !== 0 && (
          <>
            <div>
              <EditMarkButton
                marks={selectedMarks}
                isUpdating={isUpdating}
                updateMarks={async (
                  marks: Array<Pick<Mark, "id" | "speakerId">>
                ) => updateMarks({ variables: { marks } })}
              />
            </div>
            <div>
              <DeleteMarksButton
                selectedMarkIds={selectedMarkIds}
                isDeleting={isDeleting}
                deleteMarks={async (ids: string[]) =>
                  deleteMarks({ variables: { ids } })
                }
              />
            </div>
          </>
        )}
        {selections.length !== 0 && (
          <div>
            <CreateMarkButton
              isCreating={isCreating}
              selections={selections}
              createMarks={async (newMarks: Array<Mark>) => {
                await createMarks({ variables: { marks: newMarks } });
                setSelections([]);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reference;
