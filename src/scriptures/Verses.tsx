import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {useMutation} from 'react-query';
import ErrorBoundary from '../widgets/ErrorBoundary';
import {
  BulkMutationResponseBody,
  ID,
  MarkRecord,
  PersonRecord,
  Unsaved,
  VerseRecord,
  VerseSelection,
  Layers,
} from '../types';
import createVerseSelections from '../utils/createVerseSelections';
import isEmptySelection from '../utils/isEmptySelection';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import {bulkMutation} from '../api/api.client';
import queryCache from '../utils/queryCache';
import CreateMarkButton from './CreateMarkButton';
import LayersButton from './LayersButton';
import DeleteMarksButton from './DeleteMarksButton';
import EditMarksButton from './EditMarksButton';
import Verse from './Verse';

const Verses: FC<{
  verses: Array<VerseRecord>;
  marks: Array<MarkRecord>;
  speakers: Array<PersonRecord>;
}> = ({verses, speakers, marks}) => {
  const user = useContext(UserContext);
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);
  const [layers, setLayers] = useState<Layers>({speaker: true, mention: true});

  const handleSuccess = () => {
    setSelections([]);
    setSelectedMarkIds([]);
    window.getSelection()?.empty();
    queryCache.invalidateQueries('marks');
  };

  const [createMarks, {isLoading: isCreatingMarks}] = useMutation<
    BulkMutationResponseBody<MarkRecord>,
    Error,
    {marks: Array<Unsaved<MarkRecord>>}
  >(
    ({marks: marksToCreate}): Promise<BulkMutationResponseBody<MarkRecord>> =>
      bulkMutation<MarkRecord>('/api/marks/bulk', {create: marksToCreate}),
    {onSuccess: handleSuccess},
  );

  const [updateMarks, {isLoading: isUpdatingMarks}] = useMutation<
    BulkMutationResponseBody<MarkRecord>,
    Error,
    {
      marks: Array<MarkRecord>;
    }
  >(
    ({marks: newMarks}) =>
      bulkMutation<MarkRecord>('/api/marks/bulk', {update: newMarks}),
    {onSuccess: handleSuccess},
  );

  const [deleteMarks, {isLoading: isDeletingMarks}] = useMutation<
    BulkMutationResponseBody<MarkRecord>,
    Error,
    {ids: Array<ID>}
  >(
    ({ids}) => bulkMutation<MarkRecord>('/api/marks/bulk', {delete: ids}),
    {onSuccess: handleSuccess},
  );

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection) {
        if (isEmptySelection(selection)) {
          // setSelections(null);
          return;
        }
        const newSelections = createVerseSelections(verses, selection);
        if (newSelections) {
          setSelections(newSelections);
        }
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () =>
      document.removeEventListener('selectionchange', handleSelectionChange);
  }, [verses]);

  const filteredMarks = useMemo(
    () =>
      marks.filter(m => {
        if (layers.speaker && m.type === 'speaker') {
          return true;
        }
        return false;
      }),
    [layers.speaker, marks],
  );

  return (
    <ErrorBoundary grow>
      <div
        className="flex-grow flex flex-col overflow-auto min-h-screen justify-center relative"
        onClick={() => {
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
          .map(verse => (
            <Verse
              key={verse.id}
              id={verse.id}
              number={verse.number}
              text={verse.text}
              selectMarks={setSelectedMarkIds}
              marks={filteredMarks}
              selectedMarkIds={selectedMarkIds}
              speakers={speakers}
            />
          ))}
        <div className="fixed top-20 right-8 text-right">
          <div>
            <LayersButton layers={layers} onChange={setLayers} />
          </div>
        </div>
        <div className="fixed bottom-4 right-8 text-right space-y-2">
          {selectedMarkIds.length !== 0 && hasRole('author', user) && (
            <>
              <div>
                <EditMarksButton
                  speakers={speakers}
                  marks={filteredMarks}
                  selectedMarkIds={selectedMarkIds}
                  isUpdating={isUpdatingMarks}
                  updateMarks={(newMarks: Array<MarkRecord>) => {
                    updateMarks({marks: newMarks});
                  }}
                />
              </div>
              <div>
                <DeleteMarksButton
                  marks={filteredMarks}
                  selectedMarkIds={selectedMarkIds}
                  isDeleting={isDeletingMarks}
                  deleteMarks={(ids: Array<ID>) => deleteMarks({ids})}
                />
              </div>
            </>
          )}
          {selections.length !== 0 && hasRole('author', user) && (
            <div>
              <CreateMarkButton
                isCreating={isCreatingMarks}
                selections={selections}
                createMarks={(newMarks: Array<Unsaved<MarkRecord>>) =>
                  createMarks({marks: newMarks})
                }
                speakers={speakers}
              />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Verses;
