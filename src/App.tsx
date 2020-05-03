import React, {FC, Suspense} from 'react';
import {Switch, Route} from 'react-router';
import Volumes from './components/Volumes';
import Books from './components/Books';
import Chapters from './components/Chapters';
import Spinner from './components/Spinner';
import ChapterPage from './components/ChapterPage';

const App: FC<{}> = () => (
  <div className="min-h-screen flex flex-col bg-gray-100">
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
  </div>
);

export default App;
