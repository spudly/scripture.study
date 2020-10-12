import {useCallback} from 'react';
import {useQuery} from 'react-query';
import fetchJson from '../utils/fetchJson';
import {stringify} from 'querystring';
import {Audited, ID, PersonRecord} from '../utils/types';

const usePerson = (id?: ID | null) => {
  const {data: [person] = [], isLoading, error} = useQuery(
    ['people', id],
    useCallback(
      (key, personId) =>
        fetchJson<Array<Audited<PersonRecord>>>(
          `/api/people?${stringify({id: personId})}`,
        ),
      [],
    ),
    {enabled: id != null},
  );
  return [person, isLoading, error] as const;
};

export default usePerson;
