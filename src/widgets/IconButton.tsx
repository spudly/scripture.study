import React, {FC, ReactNode} from 'react';
import {Unstyled} from '../types';

const IconButton: FC<Unstyled<'button'> & {icon: ReactNode; title: string}> = ({
  icon,
  ...buttonProps
}) => (
  <button
    {...buttonProps}
    type="button"
    className="transform p-1 hover:scale-110 hover:border hover:border-gray-500 hover:bg-gray-400 rounded text-gray-500 hover:text-gray-800"
  >
    {icon}
  </button>
);

export default IconButton;
