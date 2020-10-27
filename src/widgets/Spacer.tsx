import React, {FC} from 'react';
import classnames from 'classnames';

const X = {
  2: 'pr-2',
  4: 'pr-4',
  8: 'pr-8',
};

const Y = {
  2: 'pt-2',
  8: 'pt-8',
};

type Props = {
  x?: keyof typeof X;
  y?: keyof typeof Y;
};

const Spacer: FC<Props> = ({x, y}) => (
  <div className={classnames(x ? X[x] : null, y ? Y[y] : null)} />
);

export default Spacer;
