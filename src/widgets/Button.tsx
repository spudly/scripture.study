import React, {FC} from 'react';
import classnames from 'classnames';
import {Unstyled} from '../types';

const Button: FC<Unstyled<'button'> & {minimal?: boolean}> = ({
  minimal,
  ...buttonProps
}) => (
  <button
    {...buttonProps}
    type="button"
    className={classnames(
      'text-gray-100 p-2 rounded duration-50 transform inline-flex',
      {
        'active:scale-125': minimal,
        'bg-blue-500': !minimal,
        'bg-transparent': minimal,
        'focus:outline-none': minimal,
        'font-bold': !minimal,
        'hover:bg-blue-700': !minimal,
        'hover:scale-110': minimal,
      },
    )}
  />
);

export default Button;
