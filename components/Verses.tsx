import React, {useEffect, useState, useMemo} from 'react';
import {NextPage} from 'next';
import {Verse as $Verse, Mark, VerseSelection, Person} from '../utils/types';
import Verse from './Verse';
import createVerseSelections from '../utils/createVerseSelections';
import isEmptySelection from '../utils/isEmptySelection';
import {useMutation, useQuery} from '@apollo/react-hooks';
import * as queries from '../graphql/queries';
import unique from '../utils/unique';
import EditMarksButton from './EditMarksButton';
import DeleteMarksButton from './DeleteMarksButton';
import CreateMarkButton from './CreateMarkButton';

const useCreateMarks = () =>
  useMutation<queries.CreateMarks, queries.CreateMarksVariables>(
    queries.createMarks,
    {
      refetchQueries: ['GetMarks'],
      awaitRefetchQueries: true,
    },
  );

const useDeleteMarks = (onCompleted?: () => void) =>
  useMutation<queries.DeleteMarks, queries.DeleteMarksVariables>(
    queries.deleteMarks,
    {
      refetchQueries: ['GetMarks'],
      awaitRefetchQueries: true,
      onCompleted,
    },
  );

const useUpdateMarks = (onCompleted?: () => void) =>
  useMutation<queries.UpdateMarks, queries.UpdateMarksVariables>(
    queries.updateMarks,
    {
      refetchQueries: ['GetMarks'],
      awaitRefetchQueries: true,
      onCompleted,
    },
  );

const useGetMarks = (verseIds: Array<string>) =>
  useQuery<queries.GetMarks, queries.GetMarksVariables>(queries.getMarks, {
    variables: {verseIds},
  });

const Verses: NextPage<{
  verses: Array<Pick<$Verse, 'id' | 'number' | 'text'>>;
  allSpeakers: Array<Person>;
}> = ({verses, allSpeakers}) => {
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);
  const {data: {marks} = {marks: []}} = useGetMarks(verses.map((v) => v.id));
  const speakerIds = useMemo(
    () =>
      unique(
        (marks || [])
          .filter((mark) => mark.type === 'speaker')
          .map((mark) => mark.speakerId),
      ),
    [marks],
  );
  const selectedMarks = marks.filter((m) => selectedMarkIds.includes(m.id));
  const [createMarks, {loading: isCreating}] = useCreateMarks();
  const [deleteMarks, {loading: isDeleting}] = useDeleteMarks(() =>
    setSelectedMarkIds([]),
  );
  const [updateMarks, {loading: isUpdating}] = useUpdateMarks(() =>
    setSelectedMarkIds([]),
  );
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
    document.addEventListener('selectionchange', handleSelectionChange);
    return () =>
      document.removeEventListener('selectionchange', handleSelectionChange);
  }, [verses]);

  return (
    <div
      className="flex-grow flex flex-col overflow-auto min-h-screen justify-center relative"
      onClick={(e) => {
        const selection = window.getSelection();
        if (selection?.type !== 'Range') {
          window.getSelection()?.removeAllRanges();
          setSelections([]);
        }
        setSelectedMarkIds([]);
      }}
    >
      {verses
        .sort((a, b) => a.number - b.number)
        .map((verse) => (
          <Verse
            key={verse.id}
            id={verse.id}
            number={verse.number}
            text={verse.text}
            selectMarks={setSelectedMarkIds}
            marks={marks.filter((m) => m.verseId === verse.id)}
            selectedMarkIds={selectedMarkIds}
            speakerIds={speakerIds}
            allSpeakers={allSpeakers}
          />
        ))}
      <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
        {selectedMarks.length !== 0 && (
          <>
            <div>
              <EditMarksButton
                people={allSpeakers}
                marks={selectedMarks}
                isUpdating={isUpdating}
                updateMarks={async (
                  marks: Array<Pick<Mark, 'id' | 'speakerId'>>,
                ) => updateMarks({variables: {marks}})}
              />
            </div>
            <div>
              <DeleteMarksButton
                selectedMarkIds={selectedMarkIds}
                isDeleting={isDeleting}
                deleteMarks={async (ids: string[]) =>
                  deleteMarks({variables: {ids}})
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
              createMarks={async (newMarks: Array<Omit<Mark, 'id'>>) => {
                await createMarks({variables: {marks: newMarks}});
                setSelections([]);
              }}
              people={allSpeakers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Verses;
