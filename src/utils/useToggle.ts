import {useCallback, useState} from 'react';

const useToggle = (
  init: boolean | (() => boolean),
): readonly [boolean, (arg?: unknown) => void] => {
  const [bool, setBool] = useState(init);

  const toggle = useCallback((arg: unknown) => {
    if (typeof arg === 'boolean') {
      setBool(arg);
      return;
    }

    setBool((is) => !is);
  }, []);

  return [bool, toggle] as const;
};

export default useToggle;
