import React, {FC, Suspense} from 'react';
import Head from './Head';
import {useRouteMatch} from 'react-router';
import byNumber from '../utils/byNumber';
import Directory from './Directory';
import Suspender from './Suspender';
import ErrorBoundary from './ErrorBoundary';
import {
  getVolumeByTitle,
  getChaptersByBookId,
  getBookByTitle,
} from '../sandbox/indexeddb';
import refToTitle from '../utils/refToTitle';
import useResource from '../utils/useResource';

const Chapters: FC<{}> = () => {
  const match = useRouteMatch<{volumeRef: string; bookRef: string}>(
    '/:volumeRef/:bookRef',
  )!;
  const {volumeRef, bookRef} = match.params;
  const resource = useResource(async () => {
    const volume = await getVolumeByTitle(refToTitle(volumeRef));
    const book = await getBookByTitle(refToTitle(bookRef));
    const chapters = await getChaptersByBookId(book.id);
    return {volume, book, chapters};
  }, match.url);
  return (
    <ErrorBoundary grow>
      <Suspense fallback={null}>
        <Suspender resource={resource}>
          {({volume, book, chapters}) => (
            <>
              <Head>
                <title>WikiMarks: {book.longTitle}</title>
              </Head>
              <Directory
                heading={book.title}
                small
                entries={chapters.sort(byNumber).map((chapter) => ({
                  id: chapter.id,
                  href: `/${volume.title.replace(
                    /\s/g,
                    '.',
                  )}/${book.title.replace(/\s/g, '.')}/${chapter.number}`,
                  title: String(chapter.number),
                }))}
              />
            </>
          )}
        </Suspender>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Chapters;
