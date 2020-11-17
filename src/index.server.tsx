import express from 'express';
import {logger} from './utils/logger';
import router from './api/router';
import './utils/globals';

const {PORT} = process.env;

const app = express().use(router);
app.set('trust proxy', 1);

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
