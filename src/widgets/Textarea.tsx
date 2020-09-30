import React, {FC} from 'react';
import {Unstyled} from '../utils/types';

const Textarea: FC<Unstyled<'textarea'>> = (props) => (
  <textarea
    {...props}
    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
  />
);

export default Textarea;
