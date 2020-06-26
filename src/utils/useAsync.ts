import {useState, useEffect, useCallback} from 'react';

const useAsync = <T extends any>(
  fn?: (() => Promise<T>) | undefined | null,
) => {
  const [state, setState] = useState<{
    isLoading: boolean;
    error?: Error;
    result?: T;
  }>({isLoading: false});

  const flush = useCallback(() => setState({isLoading: false}), []);

  const reload = useCallback(
    async (shouldFlush: boolean = false) => {
      if (shouldFlush) {
        flush();
      }
      setState((s) => ({...s, loading: true}));
      try {
        const result = await fn!();
        setState((s) => ({...s, loading: false, result}));
      } catch (error) {
        setState((s) => ({...s, loading: false, error}));
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
