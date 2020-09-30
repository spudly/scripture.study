import React, {FC} from 'react';
import {MdMenu} from 'react-icons/md';
import Button from '../widgets/Button';

const TopNav: FC<{openSideNav: () => void}> = ({openSideNav}) => {
  return (
    <div className="flex fixed top-0 z-10 bg-gray-900 w-full text-gray-100 p-2 items-center">
      <Button minimal onClick={openSideNav}>
        <MdMenu className="inline-block text-2xl" /> scripture.study
      </Button>
    </div>
  );
};

export default TopNav;
