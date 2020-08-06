import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import {useRouteMatch, useLocation} from 'react-router';
import Head from './Head';
import Spinner from './Spinner';
import ErrorBoundary from './ErrorBoundary';
import refToTitle from '../utils/refToTitle';
import refToNumber from '../utils/refToNumber';
import {queries} from '../data-sources/fetch';
import Spacer from './Spacer';
import Pagination from './Pagination';
import {Verse as $Verse, Mark, VerseSelection, Speaker} from '../utils/types';
import Verse from './Verse';
import createVerseSelections from '../utils/createVerseSelections';
import isEmptySelection from '../utils/isEmptySelection';
import EditMarksButton from './EditMarksButton';
import DeleteMarksButton from './DeleteMarksButton';
import CreateMarkButton from './CreateMarkButton';
import useMutation from '../utils/useMutation';
import useAsync from '../utils/useAsync';
import ErrorAlert from './ErrorAlert';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';

const Verses: FC<{
  verses: Array<$Verse>;
  marks: Array<Mark>;
  speakers: Array<Speaker>;
  reloadMarks: () => void;
}> = ({verses, speakers, marks, reloadMarks}) => {
  const user = useContext(UserContext);
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);

  const [createOrUpdateMarks, createOrUpdateMarksStatus] = useMutation(
    'createOrUpdateMarks',
    () => {
      setSelections([]);
      setSelectedMarkIds([]);
      reloadMarks();
    },
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
          {selectedMarkIds.length !== 0 && hasRole(user, 'author') && (
            <>
              <div>
                <EditMarksButton
                  speakers={speakers}
                  marks={marks}
                  selectedMarkIds={selectedMarkIds}
                  isUpdating={
                    createOrUpdateMarksStatus.readyState === 'LOADING'
                  }
                  updateMarks={createOrUpdateMarks}
                />
              </div>
              <div>
                <DeleteMarksButton
                  marks={marks}
                  selectedMarkIds={selectedMarkIds}
                  isDeleting={
                    createOrUpdateMarksStatus.readyState === 'LOADING'
                  }
                  updateMarks={createOrUpdateMarks}
                />
              </div>
            </>
          )}
          {selections.length !== 0 && hasRole(user, 'author') && (
            <div>
              <CreateMarkButton
                isCreating={createOrUpdateMarksStatus.readyState === 'LOADING'}
                selections={selections}
                createMarks={(newMarks: Array<Mark>) =>
                  createOrUpdateMarks(newMarks)
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

// TODO: move this to an exported module
const SCROLL_POSITION_BY_PATH: {[key: string]: [number, number]} = {};
const useRestoreScrollPosition = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const [x, y] = SCROLL_POSITION_BY_PATH[pathname] ?? [0, 0];
    window.scrollTo(x, y);

    return () => {
      SCROLL_POSITION_BY_PATH[pathname] = [window.scrollX, window.scrollY];
    };
  }, [pathname]);
};

const ChapterPage: FC<{}> = () => {
  useRestoreScrollPosition();
  const match = useRouteMatch<{
    volumeRef: string;
    bookRef: string;
    chapterRef: string;
  }>('/read/:volumeRef/:bookRef/:chapterRef')!;
  const {volumeRef, bookRef, chapterRef} = match.params;
  const {result: mainResult, error: mainError} = useAsync(
    useCallback(async () => {
      const volume = await queries.getVolumeByTitle(refToTitle(volumeRef));
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
      return {volume, book, chapter, verses, marks, prev, next};
    }, [volumeRef, bookRef, chapterRef]),
  );
  const {result: speakers, error: speakersError} = useAsync(
    queries.getAllSpeakers,
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

  const error = mainError || marksError || speakersError;
  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  if (!mainResult) {
    return <Spinner grow />;
  }

  const {book, chapter, verses, prev, next} = mainResult;

  return (
    <>
      <Head>
        <title>
          WikiMarks: {book.title} {chapter.number}
        </title>
      </Head>
      <div className="flex-1 flex flex-col px-4 sm:px-32">
        {chapter.number === 1 && (
          <h1 className="text-center text-6xl uppercase font-serif">
            {book.longTitle}
          </h1>
        )}
        <h2 className="text-center text-4xl uppercase font-serif">
          {chapter.number === 1 ? 'Chapter' : book.title} {chapter.number}
        </h2>

        <Spacer y={8} />

        <p className="text-4xl italic font-serif">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus
          suscipit congue. Quisque accumsan posuere elementum. Morbi nec sapien
          convallis, condimentum diam non, aliquet tellus.
        </p>

        <Spacer y={8} />
        <Pagination prevHref={prev} nextHref={next} />
        <Verses
          verses={verses}
          speakers={speakers ?? []}
          marks={marks ?? []}
          reloadMarks={reloadMarks}
        />
      </div>{' '}
    </>
  );
};

export default ChapterPage;
