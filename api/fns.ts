import {NowRequest, NowResponse} from '@now/node';
import {Db} from 'mongodb';
import getConnection from '../utils/getConnection';
import {ApiFnCall} from '../utils/types';
import * as fns from '../utils/fns';

export default async (req: NowRequest, resp: NowResponse) => {
  const conn: Db = await getConnection();
  const calls = req.body as {[key: string]: ApiFnCall};
  resp.json(
    Object.fromEntries(
      await Promise.all(
        Object.keys(calls).map(async (key) => {
          const {fn: fnName, ...params} = calls[key];
          const fn = fns[fnName];
          return [key, await fn(conn, params as any)];
        }),
      ),
    ),
  );
};
