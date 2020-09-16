import React, {FC, useState, useCallback, ReactNode} from 'react';
import classnames from 'classnames';
import Overlay from './reusable/Overlay';

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
    <>
      <div className="inline-block relative">
        {renderButton({open, close, isOpen})}
        {isOpen && <Overlay onClick={close} />}
        {isOpen && (
          <div
            className={classnames('absolute min-w-full', {
              'left-0': placement === 'left',
              'right-0': placement === 'right',
              hidden: !isOpen,
            })}
          >
            {renderMenu({
              isOpen,
              open,
              close,
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownButton;
