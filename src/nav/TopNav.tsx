import React, {FC} from 'react';
import {MdMenu} from '@meronex/icons/md';
import Button from '../widgets/Button';
import Spacer from '../widgets/Spacer';

const TopNav: FC<{openSideNav: () => void}> = ({openSideNav}) => {
  return (
    <div className="flex fixed top-0 z-10 bg-gray-900 w-full text-gray-100 p-2 items-center">
      <Button
        minimal
        onClick={openSideNav}
        aria-label="Show Side Navigation"
        title="Show Side Navigation"
      >
        <MdMenu className="inline-block text-2xl" />
      </Button>
      <Spacer x={2} />
      Scripture Study
    </div>
  );
};

export default TopNav;
