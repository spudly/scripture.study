import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import fnsRoute from './api/fns';
import webpackConfig from './webpack.config.js';
import getConnection from './utils/getConnection';
import * as fns from './utils/fns';
import {Db} from 'mongodb';

const PORT = process.env.PORT;

const app = express()
  .get('/tmp/volumes', async (req, resp) => {
    const db: Db = await getConnection();
    resp.json(await fns.getAllVolumes(db));
  })
  .get('/tmp/volume/:ref', async (req, resp) => {
    const db: Db = await getConnection();
    resp.json({
      volume: await fns.getVolumeByRef(db, {volumeRef: req.params.ref}),
      books: await fns.getBooksByVolumeRef(db, {volumeRef: req.params.ref}),
      chapters: await fns.getChaptersByVolumeRef(db, {
        volumeRef: req.params.ref,
      }),
      verses: await fns.getVersesByVolumeRef(db, {volumeRef: req.params.ref}),
    });
  })
  .use(
    webpackDevMiddleware(webpack(webpackConfig), {
      publicPath: '/',
    }),
  )
  .use(express.static('public', {index: false}))
  .use('/api/fns', bodyParser.json(), fnsRoute)
  .get('*', (req, resp) => {
    resp.sendFile(`${__dirname}/public/index.html`);
  });

app.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`);
});
