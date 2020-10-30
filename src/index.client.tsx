import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const worker = await navigator.serviceWorker.register(
      /* webpackChunkName: "worker" */
      // @ts-expect-error
      new URL('./index.worker', import.meta.url),
      {scope: '/'},
    );
    console.log('[SW] registered', {scope: worker.scope});
  });
}
