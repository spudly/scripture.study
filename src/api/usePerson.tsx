import {useCallback} from 'react';
import {useQuery} from 'react-query';
import fetchJson from '../utils/fetchJson';
import type {GetAllResponseBody, ID, PersonRecord} from '../types';

const usePerson = (id?: ID | null) => {
  const {
    data: {items: [person] = [] as Array<PersonRecord>} = {},
    isLoading,
    error,
  } = useQuery(
    ['people', id],
    () =>
      fetchJson<GetAllResponseBody<PersonRecord>>(
        `/api/people?id=${encodeURIComponent(id!)}`,
      ),
    {enabled: id != null},
  );
  return [person as PersonRecord | undefined, isLoading, error] as const;
};

export default usePerson;
