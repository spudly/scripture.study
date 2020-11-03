import {RefObject, useEffect} from 'react';

// eslint-disable-next-line no-shadow -- seems like an eslint bug
enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type Options = {
  threshold?: number; //required min distance traveled to be considered swipe
  restraint?: number; // maximum distance allowed at the same time in perpendicular direction
  allowedTime?: number; // maximum time allowed to travel that distance
};

const useSwipe = (
  elRef: RefObject<Window>,
  onSwipe: (details: {direction: Direction}) => void,
  {threshold = 150, restraint = 100, allowedTime = 300}: Options = {},
) => {
  useEffect(() => {
    let start = {time: 0, x: 0, y: 0};

    const el = elRef.current;
    if (!el) {
      return undefined;
    }
    const handleTouchStart = (e: TouchEvent) => {
      // e.preventDefault(); // breaks click events
      const [touch] = e.changedTouches;
      start = {time: Date.now(), x: touch.pageX, y: touch.pageY};
    };

    // const handleTouchMove = (e: TouchEvent) => e.preventDefault(); // prevents scrolling. do we really want this?

    const handleTouchEnd = (e: TouchEvent) => {
      // e.preventDefault(); // what default am I preventing? is this needed?
      const [touch] = e.changedTouches;
      const dist = {x: touch.pageX - start.x, y: touch.pageY - start.y};
      const elapsed = Date.now() - start.time;
      let direction: Direction | null = null;
      if (elapsed <= allowedTime) {
        if (Math.abs(dist.x) >= threshold && Math.abs(dist.y) <= restraint) {
          direction = dist.x < 0 ? Direction.LEFT : Direction.RIGHT;
        } else if (
          Math.abs(dist.y) >= threshold &&
          Math.abs(dist.x) <= restraint
        ) {
          direction = dist.y < 0 ? Direction.UP : Direction.DOWN;
        }
      }
      if (direction != null) {
        onSwipe({direction});
      }
    };

    el.addEventListener('touchstart', handleTouchStart);
    // el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener('touchend', handleTouchEnd);
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      // el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elRef, threshold, restraint, allowedTime, onSwipe]);
};

export {Direction};
export default useSwipe;
