import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/tailwind.css';

const data = JSON.parse(document.getElementById('data')!.innerHTML);

ReactDOM.hydrate(
  <BrowserRouter>
    <App initialData={data} />
  </BrowserRouter>,
  document.getElementById('root'),
);
