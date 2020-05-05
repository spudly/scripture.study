import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import fns from './api/fns';
import webpackConfig from './webpack.config.js';

const PORT = process.env.PORT;

const app = express()
  .use(
    webpackDevMiddleware(webpack(webpackConfig), {
      publicPath: '/',
    }),
  )
  .use(express.static('public', {index: false}))
  .use('/api/fns', bodyParser.json(), fns)
  .get('*', (req, resp) => {
    resp.sendFile(`${__dirname}/public/index.html`);
  });

app.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`);
});
