import {Dispatch, SetStateAction, useCallback, useState} from 'react';

const useBoolean = (
  init: boolean | (() => boolean),
): readonly [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void,
  () => void,
  () => void,
] => {
  const [bool, setBool] = useState(init);

  const setTrue = useCallback(() => setBool(true), []);
  const setFalse = useCallback(() => setBool(false), []);
  const toggle = useCallback(() => setBool((on) => !on), []);

  return [bool, setBool, setTrue, setFalse, toggle] as const;
};

export default useBoolean;
