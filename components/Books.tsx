import React, {FC, Suspense} from 'react';
import {useRouteMatch} from 'react-router';
import Head from './Head';
import bySortPosition from '../utils/bySortPosition';
import Directory from './Directory';
import Suspender from './Suspender';
import ErrorBoundary from './ErrorBoundary';
import refToTitle from '../utils/refToTitle';
import useVolume from '../utils/useVolume';
import useBooks from '../utils/useBooks';
import {Volume} from '../utils/types';

const BooksDirectory: FC<{volume: Volume}> = ({volume}) => {
  const booksResource = useBooks({volumeId: volume?.id});
  return (
    <ErrorBoundary grow>
      <Suspense fallback={null}>
        <Suspender resource={booksResource}>
          {(books) => (
            <Directory
              heading={volume.longTitle}
              entries={books.sort(bySortPosition).map((book) => ({
                id: book.id,
                href: `/${volume.title.replace(
                  /\s/g,
                  '.',
                )}/${book.title.replace(/\s/g, '.')}`,
                title: book.title,
              }))}
            />
          )}
        </Suspender>
      </Suspense>
    </ErrorBoundary>
  );
};

const Books: FC<{}> = () => {
  const match = useRouteMatch<{volumeRef: string}>('/:volumeRef')!;
  const {volumeRef} = match.params;
  const volumeResource = useVolume({title: refToTitle(volumeRef)});
  return (
    <ErrorBoundary grow>
      <Suspense fallback={null}>
        <Suspender resource={volumeResource}>
          {(volume) => (
            <>
              <Head>
                <title>WikiMarks: {volume?.longTitle ?? 'Not Found'}</title>
              </Head>
              {volume && <BooksDirectory volume={volume} />}
            </>
          )}
        </Suspender>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Books;
