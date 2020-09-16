import React, {FC} from 'react';
import classnames from 'classnames';

const Overlay: FC<{darken?: boolean; onClick?: () => void}> = ({
  darken,
  onClick,
}) => (
  <div
    className={classnames('fixed top-0 right-0 bottom-0 left-0 opacity-25', {
      'bg-black': darken,
    })}
    onClick={onClick}
  />
);

export default Overlay;
