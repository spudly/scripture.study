import { useEffect, Ref, RefObject } from "react";

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

type Options = {
  threshold?: number; //required min distance traveled to be considered swipe
  restraint?: number; // maximum distance allowed at the same time in perpendicular direction
  allowedTime?: number; // maximum time allowed to travel that distance
};

const useSwipe = (
  elRef: RefObject<Window>,
  onSwipe: (details: { direction: Direction }) => void,
  { threshold = 150, restraint = 100, allowedTime = 300 }: Options = {}
) => {
  useEffect(() => {
    let start = { x: 0, y: 0, time: 0 };

    const el = elRef.current;
    if (!el) {
      return undefined;
    }
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      start = { x: touch.pageX, y: touch.pageY, time: Date.now() };
    };

    // const handleTouchMove = (e: TouchEvent) => e.preventDefault(); // prevents scrolling. do we really want this?

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const dist = { x: touch.pageX - start.x, y: touch.pageY - start.y };
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
        onSwipe({ direction });
      }
    };

    el.addEventListener("touchstart", handleTouchStart);
    // el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      // el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [elRef, threshold, restraint, allowedTime]);
};

export { Direction };
export default useSwipe;
