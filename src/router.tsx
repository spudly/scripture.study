import express from 'express';
import React from 'react';
import {renderToNodeStream} from 'react-dom/server';
import {Db} from 'mongodb';
import getConnection from './utils/getConnection';
import Page from './Page';
import bodyParser from 'body-parser';
import * as fns from './api/fns';
import {ApiFnCall} from './utils/types';

const router = express
  .Router()
  .use(express.static('public', {index: false}))
  .use(async (_req, resp, next) => {
    const db: Db = await getConnection();
    resp.locals.db = db;
    // TODO: close db on end
    next();
  })
  .post('/api/fns', bodyParser.json(), async (req, resp) => {
    const {db} = resp.locals;
    const calls = req.body as {[key: string]: ApiFnCall};
    resp.json(
      Object.fromEntries(
        await Promise.all(
          Object.keys(calls).map(async (key) => {
            const {fn: fnName, ...params} = calls[key];
            const fn = fns[fnName];
            return [key, await fn(db, params as any)];
          }),
        ),
      ),
    );
  })
  .get('/:volumeRef?/:bookRef?/:chapterRef?', async (_req, resp) => {
    renderToNodeStream(<Page />).pipe(resp);
  });

export default router;
