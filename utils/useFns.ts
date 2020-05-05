import {useMemo} from 'react';
import createResource from './createResource';
import fetchJson from './fetchJson';
import {ApiFnCall, ApiFnCallResults} from './types';
import useStableValue from './useStableValue';

const useFns = <CALLS extends {[key: string]: ApiFnCall}>(calls: CALLS) => {
  const stableCalls = useStableValue(calls);

  return useMemo(
    () =>
      createResource(() =>
        fetchJson<
          {
            [KEY in keyof CALLS]: ApiFnCallResults[CALLS[KEY]['fn']];
          }
        >('/api/fns', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(stableCalls),
        }),
      ),
    [stableCalls],
  );
};

export default useFns;
