import React, {forwardRef} from 'react';
import {Unstyled} from '../utils/types';

const AnchorLink = forwardRef<HTMLAnchorElement, Unstyled<'a'>>(
  (props, ref) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a ref={ref} {...props} className="text-blue-500 hover:underline" />;
  },
);

export default AnchorLink;
