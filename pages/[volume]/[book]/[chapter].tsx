import React, { useState, useMemo } from "react";
import { NextPage } from "next";
import {
  Book,
  Chapter,
  Volume,
  Verse,
  VerseSelection,
  Person,
  Mark
} from "../../../utils/types";
import * as queries from "../../../graphql/queries";
import client from "../../../graphql/client";
import { useMutation, useQuery } from "@apollo/react-hooks";
import unique from "../../../utils/unique";
import SpeakerLegend from "../../../components/SpeakerLegend";
import Verses from "../../../components/Verses";
import EditMarksButton from "../../../components/EditMarksButton";
import DeleteMarksButton from "../../../components/DeleteMarksButton";
import CreateMarkButton from "../../../components/CreateMarkButton";

const useCreateMarks = () =>
  useMutation(queries.createMarks, {
    refetchQueries: ["GetMarks"],
    awaitRefetchQueries: true
  });

const useDeleteMarks = (onCompleted?: () => void) =>
  useMutation(queries.deleteMarks, {
    refetchQueries: ["GetMarks"],
    awaitRefetchQueries: true,
    onCompleted
  });

const useUpdateMarks = (onCompleted?: () => void) =>
  useMutation(queries.updateMarks, {
    refetchQueries: ["GetMarks"],
    awaitRefetchQueries: true,
    onCompleted
  });

const useGetMarks = (verseIds: Array<string>) =>
  useQuery<{ marks: Array<Mark> }, { verseIds: Array<string> }>(
    queries.getMarks,
    {
      variables: { verseIds }
    }
  );

const ChapterPage: NextPage<{
  volume: Volume;
  book: Book;
  chapter: Chapter;
  prev: Chapter;
  next: Chapter;
  verses: Array<Verse>;
  people: Array<Person>;
}> = ({ volume, book, chapter, verses, people }) => {
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);
  const { data: { marks } = { marks: [] } } = useGetMarks(
    verses.map(v => v.id)
  );
  const speakerIds = useMemo(
    () =>
      unique(
        (marks || [])
          .filter(mark => mark.type === "speaker")
          .map(mark => mark.speakerId)
      ),
    [marks]
  );
  const selectedMarks = marks.filter(m => selectedMarkIds.includes(m.id));
  const [createMarks, { loading: isCreating }] = useCreateMarks();
  const [deleteMarks, { loading: isDeleting }] = useDeleteMarks(() =>
    setSelectedMarkIds([])
  );
  const [updateMarks, { loading: isUpdating }] = useUpdateMarks(() =>
    setSelectedMarkIds([])
  );

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
      <SpeakerLegend people={people} speakerIds={speakerIds} />
      <h1>
        {book.title} {chapter.number}
      </h1>
      <Verses
        verses={verses}
        marks={marks}
        setSelections={setSelections}
        selectMarks={setSelectedMarkIds}
        selectedMarkIds={selectedMarkIds}
        speakerIds={speakerIds}
      />
      {/* {next && <Pagination type="next" href={next} />} */}
      <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
        {selectedMarks.length !== 0 && (
          <>
            <div>
              <EditMarksButton
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
              createMarks={async (newMarks: Array<Omit<Mark, "id">>) => {
                await createMarks({ variables: { marks: newMarks } });
                setSelections([]);
              }}
              people={people}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ChapterPage.getInitialProps = async ({
  query: { volume: volumeRef, book: bookRef, chapter: number }
}) => {
  const volumeTitle = (volumeRef as string).replace(/\./g, " ");
  const bookTitle = (bookRef as string).replace(/\./g, " ");
  const chapterResult = await client.query({
    query: queries.getChapter,
    variables: { volumeTitle, bookTitle, number: Number(number) }
  });
  const {
    data: { people }
  } = await client.query({
    query: queries.getPeople
  });

  const {
    volume,
    book,
    verses,
    prev,
    next,
    ...chapter
  } = chapterResult.data.chapter;

  return {
    volume,
    book,
    chapter,
    verses,
    prev,
    next,
    people
  };
};

export default ChapterPage;
