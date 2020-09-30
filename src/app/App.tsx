import React, {FC} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Chapter from '../scriptures/Chapter';
import ErrorBoundary from '../widgets/ErrorBoundary';
import Authenticate from '../auth/Authenticate';
import Speakers from '../people/Speakers';
import Title from '../widgets/Title';
import VolumeDirectory from '../scriptures/VolumeDirectory';
import BookDirectory from '../scriptures/BookDirectory';
import ChapterDirectory from '../scriptures/ChapterDirectory';
import UserSettings from '../user/UserSettings';
import UserProfile from '../user/UserProfile';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import Nav from '../nav/Nav';
import Places from '../places/Places';
import Things from '../things/Things';
import Comparisons from '../comparisons/Comparisons';
import Questions from '../questions/Questions';
import Timeline from '../timeline/Timeline';
import Topics from '../topics/Topics';

const queryCache = new QueryCache();

const App: FC = () => {
  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Title title="scripture.study">
          <Authenticate>
            <div className="min-h-screen flex flex-col bg-gray-200 pt-20">
              <ErrorBoundary grow>
                <Switch>
                  <Route path="/user/profile" component={UserProfile} />
                  <Route path="/user/settings" component={UserSettings} />
                  <Route path="/speakers" component={Speakers} />
                  <Route path="/places" component={Places} />
                  <Route path="/things" component={Things} />

                  <Route path="/comparisons" component={Comparisons} />
                  <Route path="/timeline" component={Timeline} />
                  <Route path="/topics" component={Topics} />
                  <Route path="/questions" component={Questions} />

                  <Route path="/scriptures" exact component={VolumeDirectory} />
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
            </div>
            <Nav />
          </Authenticate>
        </Title>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ReactQueryCacheProvider>
    </>
  );
};

export default App;
