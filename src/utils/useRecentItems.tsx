import useLocalStorage from './useLocalStorage';

const useRecentItems = (key: string, max: number) => {
  const [items, setItems] = useLocalStorage<Array<string>>(key, []);

  const setUsed = (item: string) => {
    setItems((list) =>
      [item, ...(list ?? []).filter((i) => i !== item)].slice(0, max),
    );
  };

  return [items, setUsed] as const;
};

export default useRecentItems;
