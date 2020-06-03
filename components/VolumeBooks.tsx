import React, {FC, useCallback} from 'react';
import {useRouteMatch} from 'react-router';
import Head from './Head';
import bySortPosition from '../utils/bySortPosition';
import Directory from './Directory';
import refToTitle from '../utils/refToTitle';
import {Volume} from '../utils/types';
import useAsync from '../utils/useAsync';
import {queries} from '../queries/fetch';
import ErrorAlert from './ErrorAlert';
import Spinner from './Spinner';

const BooksDirectory: FC<{volume: Volume}> = ({volume}) => {
  const {result: books, error} = useAsync(
    useCallback(() => queries.getAllBooksByVolumeId(volume.id), [volume.id]),
  );

  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  if (!books) {
    return <Spinner grow />;
  }

  return (
    <Directory
      heading={volume.longTitle}
      entries={books.sort(bySortPosition).map((book) => ({
        id: book.id,
        href: `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
          /\s/g,
          '.',
        )}`,
        title: book.title,
      }))}
    />
  );
};

const VolumeBooks: FC<{}> = () => {
  const match = useRouteMatch<{volumeRef: string}>('/:volumeRef')!;
  const {volumeRef} = match.params;
  const {result: volume, error} = useAsync(
    useCallback(() => queries.getVolumeByTitle(refToTitle(volumeRef)), [
      volumeRef,
    ]),
  );

  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  if (!volume) {
    return <Spinner grow />;
  }

  return (
    <>
      <Head>
        <title>WikiMarks: {volume?.longTitle ?? 'Not Found'}</title>
      </Head>
      {volume && <BooksDirectory volume={volume} />}
    </>
  );
};

export default VolumeBooks;
