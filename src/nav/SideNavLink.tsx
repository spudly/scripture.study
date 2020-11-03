import React, {FC, ReactNode} from 'react';
import classnames from 'classnames';
import {NavLink} from 'react-router-dom';

const SideNavLink: FC<{
  href: string;
  external?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  level?: 0 | 1 | 2 | 3;
  icon?: ReactNode;
}> = ({href, icon, external, children, onClick, level = 0}) => {
  const className = classnames(
    'flex items-center p-2 space-x-2 hover:bg-gray-800 space-x-2',
    {
      'pl-4': level === 1,
      'pl-8': level === 2,
      'pl-12': level === 3,
    },
  );
  const kids = (
    <>
      {icon}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </>
  );
  return external ? (
    <a href={href} className={className} onClick={onClick}>
      {kids}
    </a>
  ) : (
    <NavLink
      to={href}
      className={className}
      activeClassName="bg-gray-700"
      onClick={onClick}
    >
      {kids}
    </NavLink>
  );
};

export default SideNavLink;
