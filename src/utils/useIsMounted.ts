import {useEffect, useCallback, useRef} from 'react';

const useIsMounted = () => {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const isMounted = useCallback(() => mountedRef.current, []);

  return isMounted;
};

export default useIsMounted;
