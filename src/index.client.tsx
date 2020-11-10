import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import AnalyticsUpdater from './widgets/AnalyticsUpdater';
import App from './app/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <AnalyticsUpdater />
  </BrowserRouter>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register(
      /* webpackChunkName: "worker" */
      // @ts-expect-error
      new URL('./index.worker', import.meta.url),
      {scope: '/'},
    );
  });
}
