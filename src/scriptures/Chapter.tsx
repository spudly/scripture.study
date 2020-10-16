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
  BulkMutationResponseBody,
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
import {
  getVolumeByTitle,
  getBookByVolumeIdAndTitle,
  getChapterByBookIdAndNumber,
  getAllVersesByChapterId,
  getAllMarksByChapterId,
  getAdjacentChapters,
  getAllPeople,
  bulkMutation,
} from '../api/api.client';
import queryCache from '../utils/queryCache';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import Heading from '../widgets/Heading';

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
    BulkMutationResponseBody<MarkRecord>,
    Error,
    {marks: Array<Unsaved<MarkRecord>>}
  >(
    ({marks}): Promise<BulkMutationResponseBody<MarkRecord>> =>
      bulkMutation<MarkRecord>('/api/marks', {create: marks}),
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
      bulkMutation<MarkRecord>('/api/marks', {update: newMarks}),
    {onSuccess: handleSuccess},
  );

  const [deleteMarks, {isLoading: isDeletingMarks}] = useMutation<
    BulkMutationResponseBody<MarkRecord>,
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
    useCallback((key, title) => getVolumeByTitle(title), []),
  );

  const {data: book, isLoading: isBookLoading, error: bookError} = useQuery(
    ['books', volume?.id, refToTitle(bookRef)],
    useCallback(
      (key, volumeId, title) => getBookByVolumeIdAndTitle(volumeId, title),
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
    ['chapters', book?.id, refToNumber(chapterRef)],
    useCallback(
      (key, bookId, number) => getChapterByBookIdAndNumber(bookId, number),
      [],
    ),
    {enabled: book != null},
  );

  const {
    data: {items: verses = undefined} = {},
    isLoading: isVersesLoading,
    error: versesError,
  } = useQuery(
    ['verses', chapter?.id],
    useCallback((key, chapterId) => getAllVersesByChapterId(chapterId), []),
    {enabled: volume != null && chapter != null},
  );

  const {
    data: {items: marks = undefined} = {},
    isLoading: isMarksLoading,
    error: marksError,
  } = useQuery(
    ['marks', chapter?.id],
    useCallback((key, chapterId) => getAllMarksByChapterId(chapterId), []),
    {enabled: volume != null && chapter != null},
  );

  const {
    data: {prev, next} = {prev: null, next: null},
    isLoading: isAdjacentLoading,
    error: adjacentError,
  } = useQuery(
    ['prevChapter', chapter?.id],
    useCallback((key, chapterId) => getAdjacentChapters(chapterId), []),
    {enabled: volume != null && chapter != null},
  );

  const {
    data: {items: people = undefined} = {},
    isLoading: isPeopleLoading,
    error: peopleError,
  } = useQuery('people', getAllPeople);

  useEffect(() => {
    // TODO: use queryCache.prefetchQuery to fetch the data for the prev and next chapters
  }, []);

  if (
    isVolumeLoading ||
    isChapterLoading ||
    isBookLoading ||
    isVersesLoading ||
    isMarksLoading ||
    isAdjacentLoading ||
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
    adjacentError ??
    peopleError;

  if (!volume || !book || !chapter || !verses || !people) {
    throw new Error('missing data');
  }

  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  return (
    <Title title={`${volume.longTitle} | ${book.title} ${chapter.number}`}>
      {chapter.number === 1 && <Heading center>{book.longTitle}</Heading>}
      <Heading center level={2}>
        {chapter.number === 1 ? 'Chapter' : book.title} {chapter.number}
      </Heading>

      <Spacer y={8} />

      <p className="text-4xl italic font-serif">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus
        suscipit congue. Quisque accumsan posuere elementum. Morbi nec sapien
        convallis, condimentum diam non, aliquet tellus.
      </p>

      <Spacer y={8} />
      <Pagination
        prevHref={
          prev &&
          scriptureLinkHref(
            prev.volume.title,
            prev.book.title,
            prev.chapter.number,
          )
        }
        nextHref={
          next &&
          scriptureLinkHref(
            next.volume.title,
            next.book.title,
            next.chapter.number,
          )
        }
      />
      <div className="text-4xl">
        <Verses verses={verses} speakers={people ?? []} marks={marks ?? []} />
      </div>
    </Title>
  );
};

export default ChapterPage;
