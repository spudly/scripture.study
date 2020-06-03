import React, {FC, useCallback} from 'react';
import Head from './Head';
import {useRouteMatch} from 'react-router';
import byNumber from '../utils/byNumber';
import Directory from './Directory';
import refToTitle from '../utils/refToTitle';
import {queries} from '../queries/fetch';
import useAsync from '../utils/useAsync';
import ErrorAlert from './ErrorAlert';
import Spinner from './Spinner';

const Chapters: FC<{}> = () => {
  const match = useRouteMatch<{volumeRef: string; bookRef: string}>(
    '/:volumeRef/:bookRef',
  )!;
  const {volumeRef, bookRef} = match.params;
  const {result, error} = useAsync(
    useCallback(async () => {
      const volume = await queries.getVolumeByTitle(refToTitle(volumeRef));
      const book = await queries.getBookByTitle(volume.id, refToTitle(bookRef));
      const chapters = await queries.getAllChaptersByBookId(volume.id, book.id);
      return {volume, book, chapters};
    }, [volumeRef, bookRef]),
  );

  if (error) {
    return <ErrorAlert error={error} grow />;
  }

  if (!result) {
    return <Spinner grow />;
  }

  const {volume, book, chapters} = result;

  return (
    <>
      <Head>
        <title>WikiMarks: {book.longTitle}</title>
      </Head>
      <Directory
        heading={book.title}
        small
        entries={chapters.sort(byNumber).map((chapter) => ({
          id: chapter.id,
          href: `/${volume.title.replace(/\s/g, '.')}/${book.title.replace(
            /\s/g,
            '.',
          )}/${chapter.number}`,
          title: String(chapter.number),
        }))}
      />
    </>
  );
};

export default Chapters;
