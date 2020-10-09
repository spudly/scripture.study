import express from 'express';
import {logger} from './utils/logger';
import router from './api/router';

const PORT = process.env.PORT;

const app = express().use(router);
app.set('trust proxy', 1);

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
