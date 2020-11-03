import React, {FC, MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';

const DirectoryItem: FC<{
  href: string;
  isActive?: boolean;
  small?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}> = ({href, children, small, isActive, onClick}) => (
  <Link
    to={href}
    className={classnames(
      'flex flex-col justify-center items-center p-4 border rounded transform shadow-lg text-center duration-100 bg-white uppercase font-serif font-bold space-y-4 text-xs',
      {
        'active:scale-110 hover:scale-110 hover:bg-gray-200': !isActive,
        'bg-gray-200 scale-125': isActive,
        'w-16 h-16 m-2': small,
        'w-16 sm:w-32 h-24 sm:h-48 m-2 sm:m-4': !small,
      },
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default DirectoryItem;
