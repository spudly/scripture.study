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
    useCallback(
      (key, personId) =>
        fetchJson<GetAllResponseBody<PersonRecord>>(
          `/api/people?id=${encodeURIComponent(personId)}`,
        ),
      [],
    ),
    {enabled: id != null},
  );
  return [person as PersonRecord | undefined, isLoading, error] as const;
};

export default usePerson;
