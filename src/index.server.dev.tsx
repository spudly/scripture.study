import webpack from 'webpack';
import express from 'express';
// @ts-expect-error: if I add this types pkg, it will install @types/webpack, which should NOT be installed with webpack 5
import webpackDevMiddleware from 'webpack-dev-middleware';
// @ts-expect-error: if I add this types pkg, it will install @types/webpack, which should NOT be installed with webpack 5
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import {logger} from './utils/logger';
import router from './api/router';

const {PORT} = process.env;

const compiler = webpack(webpackConfig);

const app = express()
  .use(webpackDevMiddleware(compiler, {publicPath: '/'}))
  .use(webpackHotMiddleware(compiler))
  .use(router);

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
