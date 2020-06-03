import {NowRequest, NowResponse} from '@now/node';
import {mutations} from '../../queries/mongo';
import {Mutations} from '../../utils/types';

export default async (req: NowRequest, resp: NowResponse) => {
  const mutation = (req as any).params?.mutation ?? req.query.mutation;
  console.log(mutation, req.body);
  resp.json(await mutations[mutation as keyof Mutations](req.body));
};
