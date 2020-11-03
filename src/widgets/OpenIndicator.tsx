import React, {FC} from 'react';
import classnames from 'classnames';
import {MdKeyboardArrowRight} from 'react-icons/md';

const OpenIndicator: FC<{isOpen: boolean}> = ({isOpen}) => (
  <MdKeyboardArrowRight
    className={classnames('transform duration-50', {
      'rotate-90': isOpen,
    })}
  />
);

export default OpenIndicator;
