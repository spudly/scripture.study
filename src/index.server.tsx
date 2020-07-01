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
import React from 'react';
import {renderToStaticNodeStream} from 'react-dom/server';

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
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<!doctpe html>');
    renderToStaticNodeStream(
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#bee3f8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="CSRF-Token" content={req.csrfToken()} />
          <link rel="apple-touch-icon" href="/icons/loco-192.png" />
        </head>
        <body>
          <div id="root"></div>
          <script src="/index.client.js"></script>
        </body>
      </html>,
    ).pipe(resp);
  });

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
