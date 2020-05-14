import React, {FC, Suspense} from 'react';
import {Switch, Route} from 'react-router';
import Volumes from './Volumes';
import Books from './Books';
import Chapters from './Chapters';
import Spinner from './Spinner';
import ChapterPage from './ChapterPage';
import ErrorBoundary from './ErrorBoundary';

const App: FC<{}> = () => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <ErrorBoundary grow>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={Volumes} />
          <Route path="/:volumeRef" exact component={Books} />
          <Route path="/:volumeRef/:bookRef" exact component={Chapters} />} />
          <Route
            path="/:volumeRef/:bookRef/:chapterRef"
            exact
            component={ChapterPage}
          />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  </div>
);

export default App;
