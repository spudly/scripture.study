import webpack from 'webpack';
import path from 'path';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import queryRoute from './api/query/[query]';
import mutationRoute from './api/mutation/[mutation]';
import webpackConfig from './webpack.config.js';
import {logger, requestLogger} from './utils/logger';
import csurf from 'csurf';
import helmet from 'helmet';

const PORT = process.env.PORT;

const publicDir = path.join(__dirname, '../public');

const app = express()
  .use(helmet())
  .use(cookieParser())
  .use(csurf({cookie: true}))
  .use(requestLogger)
  .use(
    process.env.NODE_ENV === 'development'
      ? webpackDevMiddleware(webpack(webpackConfig), {
          publicPath: '/',
        })
      : (_, __, next) => next(),
  )
  .use(express.static(publicDir, {index: false}))
  .get('/api/query/:query', queryRoute)
  .post('/api/mutation/:mutation', bodyParser.json(), mutationRoute)
  .get('*', (req, resp) => {
    resp.cookie('CSRF_TOKEN', req.csrfToken());
    resp.sendFile(path.join(publicDir, 'index.html'));
  });

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
