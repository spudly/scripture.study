import React, {FC, Suspense} from 'react';
import {useRouteMatch} from 'react-router';
import Head from './Head';
import bySortPosition from '../utils/bySortPosition';
import Directory from './Directory';
import Suspender from './Suspender';
import useFns from '../utils/useFns';

const Books: FC<{}> = () => {
  const match = useRouteMatch<{volumeRef: string}>('/:volumeRef')!;
  const {volumeRef} = match.params;
  const resource = useFns({
    volume: {fn: 'getVolumeByRef', volumeRef},
    books: {fn: 'getBooksByVolumeRef', volumeRef},
  });
  return (
    <Suspense fallback={null}>
      <Suspender resource={resource}>
        {({volume, books}) => (
          <>
            <Head>
              <title>WikiMarks: {volume.longTitle}</title>
            </Head>
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
          </>
        )}
      </Suspender>
    </Suspense>
  );
};

export default Books;
