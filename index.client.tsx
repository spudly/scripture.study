import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router';
import Volumes from './components/Volumes';
import Books from './components/VolumeBooks';
import Chapters from './components/BookChapters';
import Chapter from './components/Chapter';
import ErrorBoundary from './components/ErrorBoundary';
import './css/tailwind.css';

ReactDOM.render(
  <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ErrorBoundary grow>
        <Switch>
          <Route path="/" exact component={Volumes} />
          <Route path="/:volume" exact component={Books} />
          <Route path="/:volume/:book" exact component={Chapters} />} />
          <Route path="/:volume/:book/:chapter" exact component={Chapter} />
        </Switch>
      </ErrorBoundary>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);

window.addEventListener('load', async () => {
  let swReg: ServiceWorkerRegistration;
  try {
    swReg = await navigator.serviceWorker.register('/index.client.sw.js');
    // swReg.sync.register('sync-marks');
    console.log(
      'ServiceWorker registration successful with scope: ',
      swReg.scope,
    );
  } catch (error) {
    console.log('ServiceWorker registration failed: ', error);
  }
});
