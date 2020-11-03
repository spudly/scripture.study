import React, {FC} from 'react';
import {Point} from '../types';

const Arrow: FC<{from: Point; to: Point; dashed?: boolean}> = ({
  from,
  to,
  dashed,
}) => {
  const strokeWidth = 1;
  const buffer = 2;
  const top = Math.min(from.y, to.y) - buffer;
  const left = Math.min(from.x, to.x) - buffer;
  const width =
    Math.max(Math.max(from.x, to.x) - left, strokeWidth) + buffer * 2;
  const height =
    Math.max(Math.max(from.y, to.y) - top, strokeWidth) + buffer * 2;
  const vMiddle = (top - height) / 2;

  return (
    <svg
      className="absolute pointer-events-none text-gray-500"
      style={{
        height,
        left,
        top,
        width,
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <line
        x1={from.x - left}
        y1={from.y - top}
        x2={from.x - left}
        y2={vMiddle}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? '6' : undefined}
      />
      <line
        x1={from.x - left}
        y1={vMiddle}
        x2={to.x - left}
        y2={vMiddle}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? '6' : undefined}
      />

      <line
        x1={to.x - left}
        y1={vMiddle}
        x2={to.x - left}
        y2={to.y - top}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? '6' : undefined}
      />
      <line />
    </svg>
  );
};

export default Arrow;
