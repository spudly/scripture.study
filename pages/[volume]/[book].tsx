import React from 'react';
import {NextPage} from 'next';
import Head from 'next/head';
import {Book, Chapter, Volume} from '../../utils/types';
import * as queries from '../../graphql/queries';
import getClient from '../../graphql/client';
import byNumber from '../../utils/byNumber';
import Directory from '../../components/Directory';
import getBaseUrl from '../../utils/getBaseUrl';

type Props = {
  volume: Volume;
  book: Book;
  chapters: Array<Chapter>;
};

const BookPage: NextPage<Props> = ({volume, book, chapters}) => (
  <>
    {' '}
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

BookPage.getInitialProps = async ({
  req,
  query: {volume: volumeRef, book: bookRef},
}): Promise<Props> => {
  const volumeTitle = (volumeRef as string).replace(/\./g, ' ');
  const bookTitle = (bookRef as string).replace(/\./g, ' ');
  const client = getClient(getBaseUrl(req));
  const result = await client.query<queries.GetBook, queries.GetBookVariables>({
    query: queries.getBook,
    variables: {volumeTitle, bookTitle},
  });

  const bookData = result.data.book;

  if (!bookData) {
    throw new Error('Missing Book Data');
  }

  const {volume, chapters, ...book} = bookData;

  return {
    volume,
    book,
    chapters,
  };
};

export default BookPage;
