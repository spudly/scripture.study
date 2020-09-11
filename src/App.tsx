import React, {useCallback, FC} from 'react';
import {Switch, Route, useRouteMatch, Redirect} from 'react-router';
import Chapter from './components/Chapter';
import ErrorBoundary from './components/ErrorBoundary';
import Authorize from './components/Authorize';
import Nav from './components/Nav';
import Speakers from './components/Speakers';
import useAsync from './utils/useAsync';
import {queries} from './data-sources/fetch';
import refToTitle from './utils/refToTitle';
import refToNumber from './utils/refToNumber';
import ErrorAlert from './components/ErrorAlert';
import Spinner from './components/Spinner';
import {Volume, Book, Chapter as $Chapter, Verse, Mark} from './utils/types';

const App: FC<{
  initialData?: {
    volumes: Array<Volume>;
    volume: Volume | undefined;
    books: Array<Book>;
    book: Book | undefined;
    chapters: Array<$Chapter>;
    chapter: $Chapter | undefined;
    verses: Array<Verse>;
    marks: Array<Mark>;
    prev: string | undefined;
    next: string | undefined;
  };
}> = ({initialData}) => {
  let {
    params: {volumeRef, bookRef, chapterRef},
  } = useRouteMatch<{
    volumeRef?: string;
    bookRef?: string;
    chapterRef?: string;
  }>('/read/:volumeRef?/:bookRef?/:chapterRef?') ?? {params: {}};
  const result = useAsync(
    useCallback(async () => {
      const volumes = await queries.getAllVolumes();
      const volume = volumeRef
        ? await queries.getVolumeByTitle(refToTitle(volumeRef))
        : undefined;
      const books = volume
        ? await queries.getAllBooksByVolumeId(volume.id)
        : [];
      const book =
        volume && bookRef
          ? await queries.getBookByTitle(volume.id, refToTitle(bookRef))
          : undefined;
      const chapters =
        volume && book
          ? await queries.getAllChaptersByBookId(volume.id, book.id)
          : [];
      const chapter =
        volume && book && chapterRef
          ? await queries.getChapterByBookIdAndNumber(
              volume.id,
              book.id,
              refToNumber(chapterRef),
            )
          : undefined;
      return {volumes, volume, books, book, chapters, chapter};
    }, [volumeRef, bookRef, chapterRef]),
    initialData,
  );

  if (result.error) {
    return <ErrorAlert error={result.error} />;
  }

  if (result.isLoading) {
    return <Spinner grow />;
  }

  const {volumes, volume, books, book, chapters, chapter} = result.result;

  return (
    <Authorize>
      <div className="min-h-screen flex flex-col bg-gray-200 pt-20">
        <ErrorBoundary grow>
          <Switch>
            <Route path="/speakers" exact component={Speakers} />
            <Route
              path="/read/:volume/:book/:chapter"
              exact
              render={() => <Chapter initialData={initialData as any} />}
            />
            <Route path="/read/:volume/:book" render={() => null} />
            <Route path="/read/:volume" render={() => null} />
            <Route path="/read" render={() => null} />
            <Route render={() => <Redirect to="/read" />} />
          </Switch>
        </ErrorBoundary>
      </div>
      <Nav {...{volumes, volume, books, book, chapters, chapter}} />
    </Authorize>
  );
};

export default App;
