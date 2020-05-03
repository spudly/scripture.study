import {useRef} from 'react';
import isDeepEqual from './isDeepEqual';

const useStableValue = <T>(value: T): T => {
  const prevRef = useRef(value);

  if (isDeepEqual(value, prevRef.current)) {
    return prevRef.current;
  }

  return (prevRef.current = value);
};

export default useStableValue;
