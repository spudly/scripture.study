import {useState, useEffect, useCallback} from 'react';
import useIsMounted from './useIsMounted';

type State<T> =
  | {
      isLoading: true;
      error?: undefined;
      result?: undefined;
    }
  | {
      isLoading: false;
      error: Error;
      result?: undefined;
    }
  | {
      isLoading: false;
      error?: undefined;
      result: T;
    };

const useAsync = <T extends any>(
  fn?: (() => Promise<T>) | undefined | null,
  initialResult?: T,
): State<T> & {reload: () => void; flush: () => void} => {
  const [state, setState] = useState<State<T>>(
    initialResult != null
      ? {isLoading: false, result: initialResult}
      : {isLoading: true},
  );
  const flush = useCallback(() => setState({isLoading: true}), []);
  const isMounted = useIsMounted();

  const reload = useCallback(
    async (shouldFlush: boolean = false) => {
      if (shouldFlush) {
        flush();
      }
      try {
        const result = await fn!();
        if (isMounted()) {
          setState({isLoading: false, result});
        }
      } catch (error) {
        if (isMounted()) {
          setState({isLoading: false, error});
        }
      }
    },
    [fn, flush, isMounted],
  );

  useEffect(() => {
    if (fn) {
      // TODO: when this is initially hydrated and and initialResult is provided, it should not need to reload()
      reload();
    } else {
      flush();
    }
  }, [fn, flush, reload]);

  return {...state, reload, flush};
};

export default useAsync;
