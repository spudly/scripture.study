import React, {FC, Suspense} from 'react';
import {useRouteMatch} from 'react-router';
import Head from './Head';
import {Book, Chapter as $Chapter, Volume, Verse, Person} from '../utils/types';
import Chapter from './Chapter';
import Suspender from './Suspender';
import useFns from '../utils/useFns';
import Spinner from './Spinner';

type Props = {
  volume: Volume;
  book: Book;
  chapter: $Chapter;
  prev: string | null;
  next: string | null;
  verses: Array<Verse>;
  people: Array<Person>;
};

const ChapterPage: FC<Props> = ({
  volume,
  book,
  chapter,
  verses,
  people,
  prev,
  next,
}) => {
  const match = useRouteMatch<{
    volumeRef: string;
    bookRef: string;
    chapterRef: string;
  }>('/:volumeRef/:bookRef/:chapterRef')!;
  const {volumeRef, bookRef, chapterRef} = match.params;
  const resource = useFns({
    volume: {fn: 'getVolumeByRef', volumeRef},
    book: {fn: 'getBookByRef', volumeRef, bookRef},
    chapter: {fn: 'getChapterByRef', volumeRef, bookRef, chapterRef},
    verses: {fn: 'getVersesByChapterRef', volumeRef, bookRef, chapterRef},
    adjacent: {fn: 'getAdjacentChaptersByRef', volumeRef, bookRef, chapterRef},
  });

  return (
    <Suspense fallback={<Spinner />}>
      <Suspender resource={resource}>
        {({volume, book, chapter, verses, adjacent: {prev, next}}) => (
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
  );
};

// ChapterPage.getInitialProps = async ({
//   req,
//   query: {volume: volumeRef, book: bookRef, chapter: number},
// }): Promise<Props> => {
//   const volumeTitle = (volumeRef as string).replace(/\./g, ' ');
//   const bookTitle = (bookRef as string).replace(/\./g, ' ');
//   const client = getClient(getBaseUrl(req));
//   const chapterResult = await client.query<
//     queries.GetChapter,
//     queries.GetChapterVariables
//   >({
//     query: queries.getChapter,
//     variables: {volumeTitle, bookTitle, number: Number(number)},
//   });

//   const {
//     data: {people},
//   } = await client.query<queries.GetPeople, never>({
//     query: queries.getPeople,
//   });

//   const chapterData = chapterResult.data.chapter;

//   if (!chapterData) {
//     throw new Error('Missing chapter!');
//   }

//   const {volume, book, verses, prev, next, ...chapter} = chapterData;

//   return {
//     volume,
//     book,
//     chapter,
//     verses,
//     prev,
//     next,
//     people,
//   };
// };

export default ChapterPage;
