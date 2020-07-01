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

const CSRF_TOKEN = document
  .querySelector('meta[name="CSRF-Token"]')
  ?.getAttribute('content');

if (!CSRF_TOKEN) {
  throw new Error('Missing CSRF Token');
}

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <ErrorBoundary grow>
          <Switch>
            <Route path="/" exact component={Volumes} />
            <Route path="/:volume" exact component={Books} />
            <Route path="/:volume/:book" exact component={Chapters} />
            <Route path="/:volume/:book/:chapter" exact component={Chapter} />
          </Switch>
        </ErrorBoundary>
      </div>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

const registerServiceWorker = async () => {
  try {
    const swReg: ServiceWorkerRegistration = await navigator.serviceWorker.register(
      '/index.client.sw.js',
    );
    // swReg.sync.register('sync-marks');
    console.log(
      'ServiceWorker registration successful with scope: ',
      swReg.scope,
    );
  } catch (error) {
    console.log('ServiceWorker registration failed: ', error);
  }
};

const sendCsrfToken = async () => {
  const swReg = await navigator.serviceWorker.ready;
  swReg.active?.postMessage(
    JSON.stringify({type: 'CSRF_TOKEN', token: CSRF_TOKEN}),
  );
};

const syncMarks = async () => {
  try {
    const swReg = await navigator.serviceWorker.ready;
    console.log('SYNC: triggering sync');
    await swReg.sync.register('sync-marks');
    console.log('SYNC: triggered');
    setTimeout(syncMarks, 30000);
  } catch (error) {
    console.log('SYNC: Failed', error);
  }
};

renderApp();
registerServiceWorker();
sendCsrfToken();
syncMarks();
window.addEventListener('beforeunload', () => syncMarks());
