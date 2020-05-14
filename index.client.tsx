import React from 'react';
// @ts-ignore
import {createRoot} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import './css/tailwind.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        '/index.client.sw.js',
      );
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope,
      );
    } catch (error) {
      console.log('ServiceWorker registration failed: ', error);
    }
  });
}
