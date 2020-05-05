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
