import React, {FC, ReactNode, useCallback, useState} from 'react';
import classnames from 'classnames';
import Overlay from './Overlay';

type RenderPropProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

type Props = {
  renderMenu: (props: RenderPropProps) => ReactNode;
  placement?: 'left' | 'right';
  renderButton: (props: RenderPropProps) => ReactNode;
};

const DropdownButton: FC<Props> = ({
  placement = 'left',
  renderButton,
  renderMenu,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <div className="inline-block relative">
      {renderButton({close, isOpen, open})}
      {isOpen && <Overlay onClick={close} />}
      {isOpen && (
        <div
          className={classnames('absolute min-w-full', {
            hidden: !isOpen,
            'left-0': placement === 'left',
            'right-0': placement === 'right',
          })}
        >
          {renderMenu({close, isOpen, open})}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
