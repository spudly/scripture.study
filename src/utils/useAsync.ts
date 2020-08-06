import {useState, useEffect, useCallback} from 'react';

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
): State<T> & {reload: () => void; flush: () => void} => {
  const [state, setState] = useState<State<T>>({isLoading: true});

  const flush = useCallback(() => setState({isLoading: true}), []);

  const reload = useCallback(
    async (shouldFlush: boolean = false) => {
      if (shouldFlush) {
        flush();
      }
      setState({isLoading: true});
      try {
        const result = await fn!();
        setState({isLoading: false, result});
      } catch (error) {
        setState({isLoading: false, error});
      }
    },
    [fn, flush],
  );

  useEffect(() => {
    if (fn) {
      reload();
    } else {
      flush();
    }
  }, [fn, flush, reload]);

  return {...state, reload, flush};
};

export default useAsync;
