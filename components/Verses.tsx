import React, {useEffect, useState, FC, Suspense} from 'react';
import {Verse as $Verse, Mark, VerseSelection} from '../utils/types';
import Verse from './Verse';
import createVerseSelections from '../utils/createVerseSelections';
import isEmptySelection from '../utils/isEmptySelection';
import EditMarksButton from './EditMarksButton';
import DeleteMarksButton from './DeleteMarksButton';
import CreateMarkButton from './CreateMarkButton';
import useFn from '../utils/useFn';
import Spinner from './Spinner';
import useMutationFn from '../utils/useMutationFn';
import ErrorBoundary from './ErrorBoundary';

const Verses: FC<{
  verses: Array<Pick<$Verse, 'id' | 'number' | 'text'>>;
}> = ({verses}) => {
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);
  const speakersResource = useFn({fn: 'getAllSpeakers'});
  const marksResource = useFn({
    fn: 'getMarksByVerseIds',
    verseIds: verses.map((v) => v.id),
  });

  const clearSelections = () => {
    setSelections([]);
    setSelectedMarkIds([]);
  };
  const [createMarks, createMarksStatus] = useMutationFn(
    'createMarks',
    clearSelections,
  ); // TODO: force marks to refresh

  const [deleteMarks, deleteMarksStatus] = useMutationFn(
    'deleteMarks',
    clearSelections,
  ); // TODO: force marks to refresh
  const [updateMarks, updateMarksStatus] = useMutationFn(
    'updateMarks',
    clearSelections,
  ); // TODO: force marks to refresh

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
    <ErrorBoundary grow>
      <Suspense fallback={<Spinner />}>
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
                marksResource={marksResource}
                selectedMarkIds={selectedMarkIds}
                speakersResource={speakersResource}
              />
            ))}
          <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
            {selectedMarkIds.length !== 0 && (
              <>
                <div>
                  <EditMarksButton
                    speakersResource={speakersResource}
                    marksResource={marksResource}
                    isUpdating={updateMarksStatus.readyState === 'LOADING'}
                    updateMarks={async (
                      marks: Array<Pick<Mark, 'id' | 'speakerId'>>,
                    ) => updateMarks({marks})}
                  />
                </div>
                <div>
                  <DeleteMarksButton
                    selectedMarkIds={selectedMarkIds}
                    isDeleting={deleteMarksStatus.readyState === 'LOADING'}
                    deleteMarks={async (ids: string[]) =>
                      deleteMarks({markIds: ids})
                    }
                  />
                </div>
              </>
            )}
            {selections.length !== 0 && (
              <div>
                <CreateMarkButton
                  isCreating={createMarksStatus.readyState === 'LOADING'}
                  selections={selections}
                  createMarks={(newMarks: Array<Omit<Mark, 'id'>>) =>
                    createMarks({marks: newMarks})
                  }
                  speakersResource={speakersResource}
                />
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Verses;
