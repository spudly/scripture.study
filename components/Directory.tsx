import React, {FC} from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import {DirectoryEntry} from '../utils/types';

const Directory: FC<{
  heading?: string;
  entries: Array<DirectoryEntry>;
  small?: boolean;
}> = ({heading, entries, small}) => (
  <div className="flex-1 flex flex-col">
    {heading && (
      <h1 className="text-center text-6xl uppercase font-serif font-hairline">
        {heading}
      </h1>
    )}

    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center content-center font-serif">
      {entries.map(({id, title, href}) => (
        <Link key={id} href={href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={classnames(
              'flex flex-col justify-center p-4 border rounded transform hover:scale-125 sm:m-4 shadow-lg text-center active:scale-110 duration-75 bg-white uppercase w-full hover:bg-gray-200',
              {
                'sm:w-40 sm:h-40': !small,
                'sm:w-20 sm:h-20': small,
              },
            )}
          >
            {title}
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export default Directory;
