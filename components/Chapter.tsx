import React, {FC, useEffect, useState, useCallback, useMemo} from 'react';
import {useRouteMatch} from 'react-router';
import Head from './Head';
import Spinner from './Spinner';
import ErrorBoundary from './ErrorBoundary';
import refToTitle from '../utils/refToTitle';
import refToNumber from '../utils/refToNumber';
import {queries} from '../queries/fetch';
import Spacer from './Spacer';
import Pagination from './Pagination';
import {Verse as $Verse, Mark, VerseSelection, Person} from '../utils/types';
import Verse from './Verse';
import createVerseSelections from '../utils/createVerseSelections';
import isEmptySelection from '../utils/isEmptySelection';
import EditMarksButton from './EditMarksButton';
import DeleteMarksButton from './DeleteMarksButton';
import CreateMarkButton from './CreateMarkButton';
import useMutation from '../utils/useMutation';
import useAsync from '../utils/useAsync';
import ErrorAlert from './ErrorAlert';

const Verses: FC<{
  verses: Array<Pick<$Verse, 'id' | 'number' | 'text'>>;
  marks: Array<Mark>;
  speakers: Array<Person>;
  reloadMarks: () => void;
}> = ({verses, speakers, marks, reloadMarks}) => {
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);

  const handleMarkMutated = () => {
    setSelections([]);
    setSelectedMarkIds([]);
    reloadMarks();
  };
  const [createMarks, createMarksStatus] = useMutation(
    'createMarks',
    handleMarkMutated,
  );

  const [deleteMarks, deleteMarksStatus] = useMutation(
    'deleteMarks',
    handleMarkMutated,
  );
  const [updateMarks, updateMarksStatus] = useMutation(
    'updateMarks',
    handleMarkMutated,
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
    <ErrorBoundary grow>
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
              marks={marks}
              selectedMarkIds={selectedMarkIds}
              speakers={speakers}
            />
          ))}
        <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
          {selectedMarkIds.length !== 0 && (
            <>
              <div>
                <EditMarksButton
                  speakers={speakers}
                  marks={marks}
                  selectedMarkIds={selectedMarkIds}
                  isUpdating={updateMarksStatus.readyState === 'LOADING'}
                  updateMarks={async (
                    marks: Array<Pick<Mark, 'id' | 'speakerId'>>,
                  ) => updateMarks(marks)}
                />
              </div>
              <div>
                <DeleteMarksButton
                  selectedMarkIds={selectedMarkIds}
                  isDeleting={deleteMarksStatus.readyState === 'LOADING'}
                  deleteMarks={async (ids: string[]) => deleteMarks(ids)}
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
                  createMarks(newMarks)
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

const ChapterPage: FC<{}> = () => {
  const match = useRouteMatch<{
    volumeRef: string;
    bookRef: string;
    chapterRef: string;
  }>('/:volumeRef/:bookRef/:chapterRef')!;
  const {volumeRef, bookRef, chapterRef} = match.params;
  const {result: mainResult, error: mainError} = useAsync(
    useCallback(async () => {
      const [volume, speakers] = await Promise.all([
        queries.getVolumeByTitle(refToTitle(volumeRef)),
        queries.getAllSpeakers(),
      ]);
      const book = await queries.getBookByTitle(volume.id, refToTitle(bookRef));
      const chapter = await queries.getChapterByBookIdAndNumber(
        volume.id,
        book.id,
        refToNumber(chapterRef),
      );
      const [verses, marks, prev, next] = await Promise.all([
        queries.getAllVersesByChapterId(volume.id, chapter.id),
        queries.getAllMarksByChapterId(volume.id, chapter.id),
        queries.queryPrevChapterUrl(volume.id, chapter.id),
        queries.queryNextChapterUrl(volume.id, chapter.id),
      ] as const);
      return {speakers, volume, book, chapter, verses, marks, prev, next};
    }, [volumeRef, bookRef, chapterRef]),
  );
  const {result: marks, error: marksError, reload: reloadMarks} = useAsync(
    useMemo(
      () =>
        mainResult?.volume.id && mainResult?.chapter.id
          ? () =>
              queries.getAllMarksByChapterId(
                mainResult.volume.id,
                mainResult.chapter.id,
              )
          : null,
      [mainResult],
    ),
  );

  const error = mainError || marksError;
  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  if (!mainResult) {
    return <Spinner grow />;
  }

  const {speakers, book, chapter, verses, prev, next} = mainResult;

  return (
    <>
      <Head>
        <title>
          WikiMarks: {book.title} {chapter.number}
        </title>
      </Head>
      <div className="flex-1 flex flex-col px-4 sm:px-32">
        {chapter.number === 1 && (
          <h1 className="text-center text-6xl uppercase font-serif select-none">
            {book.longTitle}
          </h1>
        )}
        <h2 className="text-center text-4xl uppercase font-serif select-none">
          {chapter.number === 1 ? 'Chapter' : book.title} {chapter.number}
        </h2>

        <Spacer y={8} />

        <p className="text-4xl italic font-serif select-none">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus
          suscipit congue. Quisque accumsan posuere elementum. Morbi nec sapien
          convallis, condimentum diam non, aliquet tellus.
        </p>

        <Spacer y={8} />
        <Pagination prevHref={prev} nextHref={next} />
        <Verses
          verses={verses}
          speakers={speakers}
          marks={marks ?? []}
          reloadMarks={reloadMarks}
        />
      </div>{' '}
    </>
  );
};

export default ChapterPage;
