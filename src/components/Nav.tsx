import React, {FC} from 'react';
import useToggle from '../utils/useToggle';
import SideNav from './SideNav';
import TopNav from './TopNav';

const Nav: FC = () => {
  const [isSideNavOpen, toggleSideNav] = useToggle(false);
  return (
    <>
      <TopNav toggleSideNav={toggleSideNav} />
      <SideNav isOpen={isSideNavOpen} toggle={toggleSideNav} />
    </>
  );
};

export default Nav;
