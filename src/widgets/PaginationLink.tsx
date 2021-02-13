import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {MdNavigateBefore, MdNavigateNext} from '@meronex/icons/md';
import classnames from 'classnames';

const PaginationLink: FC<{
  type: 'prev' | 'next';
  href: string;
}> = ({type, href}) => (
  <Link
    to={href}
    className={classnames(
      'fixed hidden sm:flex flex-col justify-center items-center top-0 bottom-0 w-16 text-center text-6xl bg-gray-500 text-black cursor-pointer opacity-0 hover:opacity-25 duration-300',
      {
        'left-0': type === 'prev',
        'right-0': type === 'next',
      },
    )}
  >
    {type === 'prev' ? (
      <MdNavigateBefore title="Previous" />
    ) : (
      <MdNavigateNext title="Next" />
    )}
  </Link>
);

export default PaginationLink;
