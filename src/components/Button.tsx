import React, {FC} from 'react';
import {Unstyled} from '../utils/types';

const Button: FC<Unstyled<'button'>> = (props) => (
  <button
    {...props}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
  />
);

export default Button;
