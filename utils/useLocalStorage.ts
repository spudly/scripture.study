import {useState, useCallback} from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    const item = window.localStorage.getItem(key);
    return item != null ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(
    (value: T | null | ((val: T | null) => T | null)) => {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    [key, storedValue],
  );

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
