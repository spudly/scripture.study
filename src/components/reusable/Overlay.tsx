import React, {FC, useEffect, useState} from 'react';
import classnames from 'classnames';

const Overlay: FC<{darken?: boolean; onClick?: () => void}> = ({
  darken,
  onClick,
}) => {
  const [beginTransition, setBeginTransition] = useState(false);

  useEffect(() => {
    setBeginTransition(true);
  }, []);

  return (
    <div
      className={classnames(
        'fixed top-0 right-0 bottom-0 left-0 opacity-50 duration-200',
        {
          'bg-black': darken && beginTransition,
        },
      )}
      onClick={onClick}
    />
  );
};

export default Overlay;
