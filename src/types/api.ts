import {ID, Unsaved} from './records';

export type GetAllResponseBody<ITEM> = {
  count: number;
  limit: number | null;
  offset: number;
  items: Array<ITEM>;
};

export type BulkMutationRequestBody<RECORD> = {
  create?: Array<Unsaved<RECORD>>;
  update?: Array<RECORD>;
  delete?: Array<ID>;
};

export type BulkMutationResponseBody<RECORD> = {
  created?: RECORD[];
  updated?: RECORD[];
  deleted?: ID[];
};
