import express from 'express';
import {logger} from './utils/logger';
import router from './api/router';

const PORT = process.env.PORT;

const app = express().use(router);

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
