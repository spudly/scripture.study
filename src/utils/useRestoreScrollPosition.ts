import {useEffect} from 'react';
import {useLocation} from 'react-router';

const SCROLL_POSITION_BY_PATH: {[key: string]: [number, number]} = {};

const useRestoreScrollPosition = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const [x, y] = SCROLL_POSITION_BY_PATH[pathname] ?? [0, 0];
    window.scrollTo(x, y);

    return () => {
      SCROLL_POSITION_BY_PATH[pathname] = [window.scrollX, window.scrollY];
    };
  }, [pathname]);
};

export default useRestoreScrollPosition;
