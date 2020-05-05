import {useMemo} from 'react';
import createResource from './createResource';
import fetchJson from './fetchJson';
import {ApiFnCall, ApiFnCallResults} from './types';
import useStableValue from './useStableValue';

const useFn = <CALL extends ApiFnCall>(call: CALL) => {
  const stableCall = useStableValue(call);

  return useMemo(
    () =>
      createResource(async () => {
        const {result} = await fetchJson<{
          result: ApiFnCallResults[CALL['fn']];
        }>('/api/fns', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({result: stableCall}),
        });
        return result;
      }),
    [stableCall],
  );
};

export default useFn;
