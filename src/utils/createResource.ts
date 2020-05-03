import {Resource} from './types';

type ResourceState<RESULT> =
  | {readyState: 'LOADING'}
  | {readyState: 'COMPLETE'; result: RESULT}
  | {readyState: 'ERROR'; error: Error};

const createResource = <RESULT extends any>(
  fn: () => Promise<RESULT>,
): Resource<RESULT> => {
  let state: ResourceState<RESULT> = {readyState: 'LOADING'};
  const promise = fn().then(
    (result) => (state = {readyState: 'COMPLETE', result}),
    (error) => (state = {readyState: 'ERROR', error}),
  );
  return {
    read() {
      switch (state.readyState) {
        case 'LOADING':
          throw promise;
        case 'ERROR':
          throw state.error;
        case 'COMPLETE':
          return state.result;
        default: {
          const neverState: never = state;
          throw new Error(`Unknown readyState: ${neverState}`);
        }
      }
    },
  };
};

export default createResource;
