import {RefObject, useEffect, useState} from 'react';

const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const resizeObserver = new (window as any).ResizeObserver(
      ([entry]: Array<any>) => {
        setSize([
          entry.borderBoxSize[0].inlineSize,
          entry.borderBoxSize[0].blockSize,
        ]);
      },
    );

    const el = ref.current;

    if (el) {
      resizeObserver.observe(el);
      return () => resizeObserver.unobserve(el);
    }

    return undefined;
  }, [ref]);

  return size;
};

export default useResizeObserver;
