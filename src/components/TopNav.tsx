import React, {FC, useContext} from 'react';
import {MdMenu} from 'react-icons/md';
import UserContext from '../utils/UserContext';
import Button from './reusable/Button';

const Breadcrumb: FC<{}> = () => {
  return <div />;
};

const TopNav: FC<{toggleSideNav: (arg?: unknown) => void}> = ({
  toggleSideNav,
}) => {
  const user = useContext(UserContext);
  return (
    <div className="flex fixed top-0 z-10 bg-gray-900 w-full text-gray-100 p-2 items-center">
      <Button minimal onClick={toggleSideNav}>
        <MdMenu className="inline-block text-2xl" /> scripture.study
      </Button>
      <Breadcrumb />
      <div className="flex-1" />
      {user && (
        <img
          src={user.picture}
          alt={user.displayName}
          className="w-8 h-8 rounded-full"
        />
      )}
    </div>
  );
};

export default TopNav;
