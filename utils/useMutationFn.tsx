import {useState} from 'react';
import {
  ApiFnCallResults,
  ApiFnName,
  ApiFnParamsByName,
  ApiFnCall,
} from './types';
import fetchJson from './fetchJson';

type MutationState =
  | {readyState: 'PENDING'}
  | {readyState: 'LOADING'}
  | {readyState: 'COMPLETE'}
  | {readyState: 'ERROR'; error: Error};

const useMutationFn = <NAME extends ApiFnName>(
  fnName: NAME,
  onComplete?: () => unknown,
): [(params: ApiFnParamsByName[NAME]) => void, MutationState] => {
  const [state, setState] = useState<MutationState>({readyState: 'PENDING'});
  const mutation = (params: ApiFnParamsByName[NAME]) => {
    setState({readyState: 'LOADING'});
    const call = {fn: fnName, ...params} as ApiFnCall;
    fetchJson<{
      result: ApiFnCallResults[NAME];
    }>('/api/fns', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({result: call}),
    }).then(
      () => {
        setState({readyState: 'COMPLETE'});
        onComplete?.();
      },
      (error) => setState({readyState: 'ERROR', error}),
    );
  };
  return [mutation, state];
};

export default useMutationFn;
