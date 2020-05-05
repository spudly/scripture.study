import React, {FC, Suspense} from 'react';
import Head from './Head';
import {useRouteMatch} from 'react-router';
import byNumber from '../utils/byNumber';
import Directory from './Directory';
import Suspender from './Suspender';
import useFns from '../utils/useFns';

const BookPage: FC<{}> = () => {
  const match = useRouteMatch<{volumeRef: string; bookRef: string}>(
    '/:volumeRef/:bookRef',
  )!;
  const {volumeRef, bookRef} = match.params;
  const resource = useFns({
    volume: {fn: 'getVolumeByRef', volumeRef},
    book: {fn: 'getBookByRef', volumeRef, bookRef},
    chapters: {fn: 'getChaptersByBookRef', volumeRef, bookRef},
  });
  return (
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
  );
};

// BookPage.getInitialProps = async ({
//   req,
//   query: {volume: volumeRef, book: bookRef},
// }): Promise<Props> => {
//   const volumeTitle = (volumeRef as string).replace(/\./g, ' ');
//   const bookTitle = (bookRef as string).replace(/\./g, ' ');
//   const client = getClient(getBaseUrl(req));
//   const result = await client.query<queries.GetBook, queries.GetBookVariables>({
//     query: queries.getBook,
//     variables: {volumeTitle, bookTitle},
//   });

//   const bookData = result.data.book;

//   if (!bookData) {
//     throw new Error('Missing Book Data');
//   }

//   const {volume, chapters, ...book} = bookData;

//   return {
//     volume,
//     book,
//     chapters,
//   };
// };

export default BookPage;
