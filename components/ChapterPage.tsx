import React, {FC, Suspense} from 'react';
import {useRouteMatch} from 'react-router';
import Head from './Head';
import {Book, Chapter as $Chapter, Volume, Verse, Person} from '../utils/types';
import Chapter from './Chapter';
import Suspender from './Suspender';
import Spinner from './Spinner';
import ErrorBoundary from './ErrorBoundary';
import useResource from '../utils/useResource';
import {
  getVolumeByTitle,
  getBookByTitle,
  getVersesByChapterId,
  getChapterByNumber,
  queryPrevChapterUrl,
  queryNextChapterUrl,
} from '../sandbox/indexeddb';
import refToTitle from '../utils/refToTitle';
import refToNumber from '../utils/refToNumber';

type Props = {
  volume: Volume;
  book: Book;
  chapter: $Chapter;
  prev: string | null;
  next: string | null;
  verses: Array<Verse>;
  people: Array<Person>;
};

const ChapterPage: FC<Props> = () => {
  const match = useRouteMatch<{
    volumeRef: string;
    bookRef: string;
    chapterRef: string;
  }>('/:volumeRef/:bookRef/:chapterRef')!;
  const {volumeRef, bookRef, chapterRef} = match.params;
  const resource = useResource(async () => {
    const [volume, book] = await Promise.all([
      getVolumeByTitle(refToTitle(volumeRef)),
      getBookByTitle(refToTitle(bookRef)),
    ] as const);
    const chapter = await getChapterByNumber(book.id, refToNumber(chapterRef));
    const [verses, prev, next] = await Promise.all([
      getVersesByChapterId(chapter.id),
      queryPrevChapterUrl(chapter),
      queryNextChapterUrl(chapter),
    ] as const);
    return {volume, book, chapter, verses, prev, next};
  }, match.url);

  return (
    <ErrorBoundary grow>
      <Suspense fallback={<Spinner />}>
        <Suspender resource={resource}>
          {({volume, book, chapter, verses, prev, next}) => (
            <>
              <Head>
                <title>
                  WikiMarks: {book.title} {chapter.number}
                </title>
              </Head>

              <Chapter
                volume={volume}
                book={book}
                chapter={chapter}
                verses={verses}
                prev={prev}
                next={next}
              />
            </>
          )}
        </Suspender>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ChapterPage;
