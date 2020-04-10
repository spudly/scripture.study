import React, {FC} from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import {DirectoryEntry} from '../utils/types';

const Directory: FC<{
  entries: Array<DirectoryEntry>;
  small?: boolean;
}> = ({entries, small}) => (
  <div className="flex-1 flex flex-wrap items-center justify-center content-center font-serif">
    {entries.map(({id, title, href}) => (
      <Link key={id} href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={classnames(
            'inline-flex flex-col justify-center p-4 border rounded transform hover:scale-105 m-4 shadow-lg text-center active:scale-110 duration-100 bg-white',
            {
              'w-32 h-32': !small,
              'w-20 h-20': small,
            },
          )}
        >
          {title}
        </a>
      </Link>
    ))}
  </div>
);

export default Directory;
