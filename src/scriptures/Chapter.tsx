import React, {FC, useEffect, useState, useContext, useCallback} from 'react';
import {useRouteMatch, useLocation} from 'react-router';
import Spinner from '../widgets/Spinner';
import ErrorBoundary from '../widgets/ErrorBoundary';
import refToTitle from '../utils/refToTitle';
import refToNumber from '../utils/refToNumber';
import Spacer from '../widgets/Spacer';
import Pagination from '../widgets/Pagination';
import {
  VerseRecord,
  MarkRecord,
  VerseSelection,
  PersonRecord,
  MutationResponseBody,
  Unsaved,
  ID,
} from '../utils/types';
import Verse from './Verse';
import createVerseSelections from '../utils/createVerseSelections';
import isEmptySelection from '../utils/isEmptySelection';
import EditMarksButton from './EditMarksButton';
import DeleteMarksButton from './DeleteMarksButton';
import CreateMarkButton from './CreateMarkButton';
import ErrorAlert from '../widgets/ErrorAlert';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import Title from '../widgets/Title';
import {useMutation, useQuery} from 'react-query';
import {bulkMutation, queries} from '../api/api.client';
import queryCache from '../utils/queryCache';

const Verses: FC<{
  verses: Array<VerseRecord>;
  marks: Array<MarkRecord>;
  speakers: Array<PersonRecord>;
}> = ({verses, speakers, marks}) => {
  const user = useContext(UserContext);
  const [selections, setSelections] = useState<Array<VerseSelection>>([]);
  const [selectedMarkIds, setSelectedMarkIds] = useState<string[]>([]);

  const handleSuccess = () => {
    setSelections([]);
    setSelectedMarkIds([]);
    window.getSelection()?.empty();
    queryCache.invalidateQueries('marks');
  };

  const [createMarks, {isLoading: isCreatingMarks}] = useMutation<
    MutationResponseBody,
    Error,
    {marks: Array<Unsaved<MarkRecord>>}
  >(
    ({marks}): Promise<MutationResponseBody> =>
      bulkMutation<MarkRecord>('/api/marks', {create: marks}),
    {onSuccess: handleSuccess},
  );

  const [updateMarks, {isLoading: isUpdatingMarks}] = useMutation<
    MutationResponseBody,
    Error,
    {
      marks: Array<MarkRecord>;
    }
  >(
    ({marks: newMarks}) =>
      bulkMutation<MarkRecord>('/api/marks', {update: newMarks}),
    {onSuccess: handleSuccess},
  );

  const [deleteMarks, {isLoading: isDeletingMarks}] = useMutation<
    MutationResponseBody,
    Error,
    {ids: Array<ID>}
  >(
    ({ids}) => bulkMutation<MarkRecord>('/api/marks', {delete: ids}),
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
          {selectedMarkIds.length !== 0 && hasRole('author', user) && (
            <>
              <div>
                <EditMarksButton
                  speakers={speakers}
                  marks={marks}
                  selectedMarkIds={selectedMarkIds}
                  isUpdating={isUpdatingMarks}
                  updateMarks={(marks: Array<MarkRecord>) => {
                    updateMarks({marks});
                  }}
                />
              </div>
              <div>
                <DeleteMarksButton
                  marks={marks}
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
                createMarks={(marks: Array<Unsaved<MarkRecord>>) =>
                  createMarks({marks})
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

const ChapterPage: FC = () => {
  useRestoreScrollPosition();
  const match = useRouteMatch<{
    volumeRef: string;
    bookRef: string;
    chapterRef: string;
  }>('/scriptures/:volumeRef/:bookRef/:chapterRef')!;
  const {volumeRef, bookRef, chapterRef} = match.params;

  const {
    data: volume,
    isLoading: isVolumeLoading,
    error: volumeError,
  } = useQuery(
    ['volumes', refToTitle(volumeRef)],
    useCallback((key, title) => queries.getVolumeByTitle(title), []),
  );

  const {data: book, isLoading: isBookLoading, error: bookError} = useQuery(
    ['books', volume?.id, refToTitle(bookRef)],
    useCallback(
      (key, volumeId, title) => queries.getBookByTitle(volumeId, title),
      [],
    ),
    {
      enabled: volume != null,
    },
  );

  const {
    data: chapter,
    isLoading: isChapterLoading,
    error: chapterError,
  } = useQuery(
    ['chapters', volume?.id, book?.id, refToNumber(chapterRef)],
    useCallback(
      (key, volumeId, bookId, number) =>
        queries.getChapterByBookIdAndNumber(volumeId, bookId, number),
      [],
    ),
    {enabled: volume != null && book != null},
  );

  const {
    data: verses,
    isLoading: isVersesLoading,
    error: versesError,
  } = useQuery(
    ['verses', volume?.id, chapter?.id],
    useCallback(
      (key, volumeId, chapterId) =>
        queries.getAllVersesByChapterId(volumeId, chapterId),
      [],
    ),
    {enabled: volume != null && chapter != null},
  );

  const {data: marks, isLoading: isMarksLoading, error: marksError} = useQuery(
    ['marks', volume?.id, chapter?.id],
    useCallback(
      (key, volumeId, chapterId) =>
        queries.getAllMarksByChapterId(volumeId, chapterId),
      [],
    ),
    {enabled: volume != null && chapter != null},
  );

  const {data: prev, isLoading: isPrevLoading, error: prevError} = useQuery(
    ['prevChapter', volume?.id, chapter?.id],
    useCallback(
      (key, volumeId, chapterId) =>
        queries.queryPrevChapterUrl(volumeId, chapterId),
      [],
    ),
    {enabled: volume != null && chapter != null},
  );

  const {data: next, isLoading: isNextLoading, error: nextError} = useQuery(
    ['nextChapter', volume?.id, chapter?.id],
    useCallback(
      (key, volumeId, chapterId) =>
        queries.queryNextChapterUrl(volumeId, chapterId),
      [],
    ),
    {enabled: volume != null && chapter != null},
  );

  const {
    data: people,
    isLoading: isPeopleLoading,
    error: peopleError,
  } = useQuery('people', queries.getAllPeople);

  useEffect(() => {
    // TODO: use queryCache.prefetchQuery to fetch the data for the prev and next chapters
  }, []);

  if (
    isVolumeLoading ||
    isChapterLoading ||
    isBookLoading ||
    isVersesLoading ||
    isMarksLoading ||
    isPrevLoading ||
    isNextLoading ||
    isPeopleLoading
  ) {
    return <Spinner grow />;
  }

  const error =
    volumeError ??
    chapterError ??
    bookError ??
    versesError ??
    marksError ??
    prevError ??
    nextError ??
    peopleError;

  if (!volume || !book || !chapter || !verses || !people) {
    throw new Error('missing data');
  }

  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  return (
    <Title title={`${volume.longTitle} | ${book.title} ${chapter.number}`}>
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
        <Verses verses={verses} speakers={people ?? []} marks={marks ?? []} />
      </div>
    </Title>
  );
};

export default ChapterPage;
