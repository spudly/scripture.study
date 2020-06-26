import {NowRequest, NowResponse} from '@now/node';
import {mutations} from '../../data-sources/mongo';
import {Mutations} from '../../utils/types';
import {requestLogger} from '../../utils/logger';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';

export default async (
  req: NowRequest | ExpressRequest,
  resp: NowResponse | ExpressResponse,
) => {
  requestLogger(req, resp);
  const mutation = (req as any).params?.mutation ?? req.query.mutation;
  req.log.info({mutation, body: req.body}, 'Mutation');
  resp.json(await mutations[mutation as keyof Mutations](req.body));
};
