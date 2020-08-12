import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
import {logger} from './utils/logger';
import router from './router';

const PORT = process.env.PORT;

const compiler = webpack(webpackConfig);

const app = express()
  .use(webpackDevMiddleware(compiler, {publicPath: '/'}))
  .use(webpackHotMiddleware(compiler))
  .use(router);

logger.info({port: PORT}, 'trying to listen');
app.listen(PORT, () => {
  logger.info({url: `http://localhost:${PORT}`}, 'Listening');
});
