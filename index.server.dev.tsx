import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import queryRoute from './api/query/[query]';
import mutationRoute from './api/mutation/[mutation]';
import webpackConfig from './webpack.config.js';
const PORT = process.env.PORT;

const app = express()
  .use(
    webpackDevMiddleware(webpack(webpackConfig), {
      publicPath: '/',
    }),
  )
  .use(express.static('public', {index: false}))
  .use('/api/query/:query', queryRoute)
  .use('/api/mutation/:mutation', bodyParser.json(), mutationRoute)
  .get('*', (req, resp) => {
    resp.sendFile(`${__dirname}/public/index.html`);
  });

console.log('trying to listen');
app.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`);
});
