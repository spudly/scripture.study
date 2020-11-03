import React, {FC, RefObject, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import useSwipe, {Direction} from '../utils/useOnSwipe';
import PaginationLink from './PaginationLink';

const Pagination: FC<{
  prevHref?: string | null;
  nextHref?: string | null;
}> = ({prevHref, nextHref}) => {
  const windowRef: RefObject<Window> = useRef<Window | null>(
    typeof window !== 'undefined' ? window : /* SSR: */ null,
  );

  useEffect(() => {
    document.body.style.overscrollBehaviorX = 'none';
  }, []);

  const history = useHistory();
  useSwipe(windowRef, ({direction}) => {
    if (prevHref && direction === Direction.RIGHT) {
      history.push(prevHref);
    } else if (nextHref && direction === Direction.LEFT) {
      history.push(nextHref);
    }
  });

  return (
    <>
      {prevHref && <PaginationLink type="prev" href={prevHref} />}
      {nextHref && <PaginationLink type="next" href={nextHref} />}
    </>
  );
};

export default Pagination;
