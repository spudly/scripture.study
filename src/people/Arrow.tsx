import React, {FC} from 'react';
import {Point} from '../utils/types';

const Arrow: FC<{from: Point; to: Point}> = ({from, to}) => {
  const strokeWidth = 1;
  const buffer = 2;
  const top = Math.min(from.y, to.y) - buffer;
  const left = Math.min(from.x, to.x) - buffer;
  const width =
    Math.max(Math.max(from.x, to.x) - left, strokeWidth) + buffer * 2;
  const height =
    Math.max(Math.max(from.y, to.y) - top, strokeWidth) + buffer * 2;

  return (
    <svg
      className="absolute pointer-events-none text-gray-400"
      style={{
        top,
        left,
        width,
        height,
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <line
        x1={from.x - left}
        y1={from.y - top}
        x2={from.x - left}
        y2={(to.y - top) / 2}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <line
        x1={from.x - left}
        y1={(to.y - top) / 2}
        x2={to.x - left}
        y2={(to.y - top) / 2}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      <line
        x1={to.x - left}
        y1={(to.y - top) / 2}
        x2={to.x - left}
        y2={to.y - top}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <line />
    </svg>
  );
};

export default Arrow;
