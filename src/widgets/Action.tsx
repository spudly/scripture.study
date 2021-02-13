import React, {FC, ReactNode, useCallback, useState} from 'react';
import classnames from 'classnames';
import {MdClose} from '@meronex/icons/md';
import {ThemeName, theme} from '../utils/themes';
import CircleButton from './CircleButton';
import Overlay from './Overlay';

const Action: FC<{
  icon: ReactNode;
  themeId: number | ThemeName;
  disabled?: boolean;
  children: (arg: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => ReactNode;
}> = ({themeId, icon, disabled, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(is => !is), []);

  return (
    <div>
      {isOpen && <Overlay onClick={close} />}
      <div
        className={classnames(
          'relative flex items-center duration-100 min-w-20 min-h-20',
          {
            'rounded-full': !isOpen,
            'rounded-lg': isOpen,
            'max-w-20': !isOpen,
            'max-h-20': !isOpen,
            'max-w-96': isOpen,
            'max-h-96': isOpen,
            'opacity-50': !isOpen,
            'hover:opacity-100': !isOpen,
          },
          theme(themeId, {states: ['default']}),
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-shrink min-w-0 overflow-hidden text-base">
          <div className="px-8">{children({open, close, toggle})}</div>
        </div>
        <div className="self-start">
          <CircleButton themeId={themeId} onClick={toggle} disabled={disabled}>
            {isOpen ? <MdClose /> : icon}
          </CircleButton>
        </div>
      </div>
    </div>
  );
};

export default Action;
