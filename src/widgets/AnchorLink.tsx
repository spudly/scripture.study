import React, {forwardRef} from 'react';
import {Unstyled} from '../types';

const AnchorLink = forwardRef<HTMLAnchorElement, Unstyled<'a'>>(
  (props, ref) => {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a ref={ref} {...props} className="text-blue-700 hover:underline" />
    );
  },
);

export default AnchorLink;
