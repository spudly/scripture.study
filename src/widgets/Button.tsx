import React, {FC} from 'react';
import {Unstyled} from '../utils/types';
import classnames from 'classnames';

const Button: FC<Unstyled<'button'> & {minimal?: boolean}> = ({
  minimal,
  ...buttonProps
}) => (
  <button
    {...buttonProps}
    className={classnames('text-gray-100 p-2 rounded duration-50 transform', {
      'bg-blue-500': !minimal,
      'hover:bg-blue-700': !minimal,
      'bg-transparent': minimal,
      'focus:outline-none': minimal,
      'hover:scale-110': minimal,
      'active:scale-125': minimal,
      'font-bold': !minimal,
    })}
  />
);

export default Button;
