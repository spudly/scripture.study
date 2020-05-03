import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import router from './router';
// @ts-ignore
import webpackConfig from '../webpack.config';

const PORT = process.env.PORT;

const app = express()
  .use(
    webpackDevMiddleware(webpack({...webpackConfig, mode: 'development'}), {
      publicPath: '/',
    }),
  )
  .use(router);

app.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`);
});
