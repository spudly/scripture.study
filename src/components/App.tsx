import React, {FC} from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Chapter from './Chapter';
import ErrorBoundary from './reusable/ErrorBoundary';
import Authenticate from './Authenticate';
import Speakers from './Speakers';
import Title from './reusable/Title';
import VolumeDirectory from './VolumeDirectory';
import BookDirectory from './BookDirectory';
import ChapterDirectory from './ChapterDirectory';
import UserSettings from './UserSettings';
import UserProfile from './UserProfile';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import Nav from './Nav';
import Places from './Places';
import Things from './Things';

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
