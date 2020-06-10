import {NowRequest, NowResponse} from '@now/node';
import {queries} from '../../data-sources/mongo';

export default async (req: NowRequest, resp: NowResponse) => {
  const query = (req as any).params?.query ?? req.query.query;
  const arg = req.query.arg;
  const queryFn = queries[query as keyof typeof queries];
  console.log(
    'query:',
    query,
    'args:',
    ...(Array.isArray(arg) ? arg : arg != null ? [arg] : []),
  );
  const result = await queryFn(
    // @ts-ignore
    ...(Array.isArray(arg) ? arg : arg != null ? [arg] : []),
  );
  resp.json(result);
};
