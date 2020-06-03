import {NowRequest, NowResponse} from '@now/node';
import {queries} from '../../queries/mongo';

export default async (req: NowRequest, resp: NowResponse) => {
  console.log('query');
  const query = (req as any).params?.query ?? req.query.query;
  const arg = req.query.arg;
  const queryFn = queries[query as keyof typeof queries];
  console.log(query, ...(Array.isArray(arg) ? arg : arg != null ? [arg] : []));
  const result = await queryFn(
    // @ts-ignore
    ...(Array.isArray(arg) ? arg : arg != null ? [arg] : []),
  );
  console.log(`got result for ${query}`);
  resp.json(result);
};
