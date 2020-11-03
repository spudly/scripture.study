import React, {FC, ReactNode, useCallback, useState} from 'react';
import classnames from 'classnames';
import {ThemeName, theme} from '../utils/themes';
import CircleButton from './CircleButton';
import Overlay from './Overlay';

const Action: FC<{
  icon: ReactNode;
  themeId: number | ThemeName;
  disabled?: boolean;
  children: (arg: {close: () => void}) => ReactNode;
}> = ({themeId, icon, disabled, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <div>
      {isOpen && <Overlay onClick={close} />}
      <div
        className={classnames(
          'relative flex items-center duration-100 rounded-full',
          {
            'w-20': !isOpen,
            'w-64': isOpen,
          },
          theme(themeId, {states: ['default']}),
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink min-w-0 overflow-hidden rounded-full text-base">
          <div className="px-8">{children({close})}</div>
        </div>
        <div>
          <CircleButton themeId={themeId} onClick={open} disabled={disabled}>
            {icon}
          </CircleButton>
        </div>
      </div>
    </div>
  );
};

export default Action;
