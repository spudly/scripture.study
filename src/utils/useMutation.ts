import {useState} from 'react';
import type {Mutations, MutationState} from './types';
import {mutations} from '../api/api.client';

const useMutation = <NAME extends keyof Mutations>(
  name: NAME,
  onComplete?: () => void,
): [(...args: Parameters<Mutations[NAME]>) => void, MutationState] => {
  const [state, setState] = useState<MutationState>({readyState: 'NONE'});

  const mutate = async (...args: Parameters<Mutations[NAME]>) => {
    setState({readyState: 'LOADING'});
    // @ts-ignore
    await mutations[name](...args);
    setState({readyState: 'COMPLETE'});
    onComplete?.();
  };

  return [mutate, state];
};

export default useMutation;
