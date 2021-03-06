import React, {FC, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {QueryClientProvider} from 'react-query';
import {Link} from 'react-router-dom';
import ErrorBoundary from '../widgets/ErrorBoundary';
import Authenticate from '../auth/Authenticate';
import Title from '../widgets/Title';
import Nav from '../nav/Nav';
import Comparisons from '../comparisons/Comparisons';
import queryClient from '../utils/queryClient';
import Spinner from '../widgets/Spinner';
import BrowserSupport from '../support/BrowserSupport';
import AnchorLink from '../widgets/AnchorLink';
import BrowserAlert from '../widgets/BrowserAlert';

const Chapter = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Chapter" */
      '../scriptures/Chapter'
    ),
);
const VolumeDirectory = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "VolumeDirectory" */ '../scriptures/VolumeDirectory'
    ),
);
const BookDirectory = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "BookDirectory" */ '../scriptures/BookDirectory'
    ),
);
const ChapterDirectory = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "ChapterDirectory" */ '../scriptures/ChapterDirectory'
    ),
);
const UserSettings = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "UserSettings" */
      '../user/UserSettings'
    ),
);
const UserProfile = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "UserProfile" */
      '../user/UserProfile'
    ),
);
const Places = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Places" */
      '../places/Places'
    ),
);
const Things = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Things" */
      '../things/Things'
    ),
);
const Questions = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Questions" */
      '../questions/Questions'
    ),
);
const Timeline = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Timeline" */
      '../timeline/Timeline'
    ),
);
const Topics = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Topics" */
      '../topics/Topics'
    ),
);
const Person = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Person" */
      '../people/Person'
    ),
);
const People = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "People" */
      '../people/People'
    ),
);
const Time = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Time" */
      '../time/Time'
    ),
);

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Title title="scripture.study">
        <Authenticate>
          <div className="min-h-screen flex flex-col bg-gray-200 pt-20">
            <BrowserAlert />
            <main className="px-4 sm:px-32">
              <Suspense fallback={<Spinner grow />}>
                <ErrorBoundary grow>
                  <Switch>
                    <Route
                      path="/support/browsers"
                      component={BrowserSupport}
                    />
                    <Route path="/user/profile" component={UserProfile} />
                    <Route path="/user/settings" component={UserSettings} />
                    <Route path="/time" render={({match}) => <Time />} />
                    <Route
                      path="/people/:id"
                      render={({match}) => <Person id={match.params.id} />}
                    />
                    <Route path="/people" component={People} />
                    <Route path="/places" component={Places} />
                    <Route path="/things" component={Things} />

                    <Route path="/comparisons" component={Comparisons} />
                    <Route path="/timeline" component={Timeline} />
                    <Route path="/topics" component={Topics} />
                    <Route path="/questions" component={Questions} />

                    <Route
                      path="/scriptures"
                      exact
                      component={VolumeDirectory}
                    />
                    <Route
                      path="/scriptures/:volume"
                      exact
                      component={BookDirectory}
                    />

                    <Route
                      path="/scriptures/:volume/:book"
                      exact
                      component={ChapterDirectory}
                    />
                    <Route
                      path="/scriptures/:volume/:book/:chapter"
                      exact
                      render={() => <Chapter />}
                    />
                    <Route render={() => <Redirect to="/scriptures" />} />
                  </Switch>
                </ErrorBoundary>
              </Suspense>
            </main>

            <div className="flex-1" />

            <footer className="p-4 flex flex-col sm:flex-row text-center">
              <div>
                Copyright &copy; 2019-{new Date().getFullYear()} Stephen
                Sorensen. All Rights Reserved.
              </div>
              <div className="flex-1" />
              <Link to="/support/browsers" component={AnchorLink}>
                Supported Browsers
              </Link>
            </footer>
          </div>
          <Nav />
        </Authenticate>
      </Title>
    </QueryClientProvider>
  );
};

export default App;
