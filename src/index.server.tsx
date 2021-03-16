import './utils/globals';
import express from 'express';
import {logger} from './utils/logger';
import router from './api/router';

logger.info({NODE_ENV: process.env.NODE_ENV}, 'NODE_ENV');
logger.info({IS_DEV, IS_PROD, IS_TEST}, 'globals');

const {PORT} = process.env;

const app = express().use(router);
app.set('trust proxy', 1);

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
