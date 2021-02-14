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