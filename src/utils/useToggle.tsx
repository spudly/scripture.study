import {Dispatch, SetStateAction, useCallback, useState} from 'react';

const useToggle = (
  init: boolean | (() => boolean),
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(init);

  const toggleValue = useCallback(() => setValue((val) => !val), []);
  return [value, toggleValue, setValue];
};

export default useToggle;
