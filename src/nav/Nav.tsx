import React, {FC} from 'react';
import useBoolean from '../utils/useBoolean';
import SideNav from './SideNav';
import TopNav from './TopNav';

const Nav: FC = () => {
  const [isSideNavOpen, , open, close] = useBoolean(false);
  return (
    <>
      <TopNav openSideNav={open} />
      <SideNav isOpen={isSideNavOpen} close={close} />
    </>
  );
};

export default Nav;
