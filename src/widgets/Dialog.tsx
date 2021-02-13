import React, {FC, ReactNode, useEffect} from 'react';
import {MdClose} from '@meronex/icons/md';
import Overlay from './Overlay';

const Dialog: FC<{title: ReactNode; close: () => void}> = ({
  title,
  children,
  close,
}) => {
  useEffect(() => {
    const handleKeyDown = ({key}: KeyboardEvent) => {
      if (key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  return (
    <>
      <Overlay darken onClick={close} />
      <dialog open className="w-3/4 shadow-2xl bg-white fixed top-0 mt-24">
        <button
          type="button"
          className="text-2xl transform hover:scale-150 absolute top-0 right-0 p-2 duration-200 focus:outline-none"
          onClick={close}
        >
          <MdClose />
        </button>
        <h2 className="text-4xl">{title}</h2>
        <div className="space-y-4">{children}</div>
      </dialog>
    </>
  );
};

export default Dialog;
