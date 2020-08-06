import {queries} from '../../data-sources/mongo';
import {requestLogger} from '../../utils/logger';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';

export default async (req: ExpressRequest, resp: ExpressResponse) => {
  requestLogger(req, resp);
  const query = (req as any).params?.query ?? req.query.query;
  const arg = req.query.arg;
  const queryFn: Function = queries[query as keyof typeof queries];
  const args: any = Array.isArray(arg) ? arg : arg != null ? [arg] : [];
  req.log.info({query, args}, 'Query');
  const result = await queryFn(...args);
  resp.json(result);
};
