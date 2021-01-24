import React, {FC, useCallback, useEffect} from 'react';
import {useRouteMatch} from 'react-router';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import {isNotNil} from '@spudly/pushpop';
import Spinner from '../widgets/Spinner';
import refToTitle from '../utils/refToTitle';
import refToNumber from '../utils/refToNumber';
import Spacer from '../widgets/Spacer';
import Pagination from '../widgets/Pagination';
import ErrorAlert from '../widgets/ErrorAlert';
import Title from '../widgets/Title';
import {
  getAdjacentChapters,
  getAllMarksByChapterId,
  getAllPeople,
  getAllVersesByChapterId,
  getBookByVolumeIdAndTitle,
  getChapterByBookIdAndNumber,
  getVolumeByTitle,
} from '../api/api.client';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import Heading from '../widgets/Heading';
import useRestoreScrollPosition from '../utils/useRestoreScrollPosition';
import {BookRecord, ChapterRecord, VolumeRecord} from '../types';
import Verses from './Verses';

type PrevNext = {
  volume: VolumeRecord;
  book: BookRecord;
  chapter: ChapterRecord;
};

const prefetchAdjacent = async (
  queryClient: QueryClient,
  prev: PrevNext | null,
  next: PrevNext | null,
): Promise<void> => {
  await Promise.all(
    [prev, next]
      .filter(isNotNil)
      .flatMap<Promise<any>>(({volume, book, chapter}) => [
        queryClient.prefetchQuery(['volumes', volume.title], () =>
          getVolumeByTitle(volume.title),
        ),
        queryClient.prefetchQuery(['books', volume.id, book.title], () =>
          getBookByVolumeIdAndTitle(volume.id, book.title),
        ),
        queryClient.prefetchQuery(['chapters', book.id, chapter.number], () =>
          getChapterByBookIdAndNumber(book.id, chapter.number),
        ),
        queryClient.prefetchQuery(['verses', chapter.id], () =>
          getAllVersesByChapterId(chapter.id),
        ),
        queryClient.prefetchQuery(['marks', chapter?.id], () =>
          getAllMarksByChapterId(chapter?.id),
        ),
      ]),
  );
};

const Chapter: FC = () => {
  const queryClient = useQueryClient();
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
  } = useQuery(['volumes', refToTitle(volumeRef)], () =>
    getVolumeByTitle(refToTitle(volumeRef)),
  );

  const {data: book, isLoading: isBookLoading, error: bookError} = useQuery(
    ['books', volume?.id, refToTitle(bookRef)],
    () => getBookByVolumeIdAndTitle(volume!.id, refToTitle(bookRef)),
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
    () => getChapterByBookIdAndNumber(book!.id, refToNumber(chapterRef)),
    {enabled: book != null},
  );

  const {
    data: {items: verses = undefined} = {},
    isLoading: isVersesLoading,
    error: versesError,
  } = useQuery(
    ['verses', chapter?.id],
    () => getAllVersesByChapterId(chapter!.id),
    {enabled: volume != null && chapter != null},
  );

  const {data: marks, isLoading: isMarksLoading, error: marksError} = useQuery(
    ['marks', chapter?.id],
    () => getAllMarksByChapterId(chapter!.id),
    {enabled: volume != null && chapter != null},
  );

  const {
    data: {prev, next} = {next: null, prev: null},
    isLoading: isAdjacentLoading,
    error: adjacentError,
  } = useQuery(
    ['prevChapter', chapter?.id],
    () => getAdjacentChapters(chapter!.id),
    {enabled: volume != null && chapter != null},
  );

  const {
    data: {items: people = undefined} = {},
    isLoading: isPeopleLoading,
    error: peopleError,
  } = useQuery('people', getAllPeople);

  useEffect(() => {
    prefetchAdjacent(queryClient, prev, next);
  }, [queryClient, prev, next]);

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
      {chapter.number === 1 && (
        <Heading center as={2}>
          {book.longTitle}
        </Heading>
      )}
      <Heading center level={2} as={3}>
        {chapter.number === 1 ? 'Chapter' : book.title} {chapter.number}
      </Heading>

      <Spacer y={8} />

      <p className="text-2xl italic font-serif">
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
      <div className="text-2xl mb-48">
        <Verses verses={verses} speakers={people ?? []} marks={marks ?? []} />
      </div>
    </Title>
  );
};

export default Chapter;
