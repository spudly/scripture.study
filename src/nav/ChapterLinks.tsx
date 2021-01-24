import React, {FC, useCallback} from 'react';
import {NavLink} from 'react-router-dom';
import {useQuery} from 'react-query';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import {getAllChaptersByBookId} from '../api/api.client';
import {BookRecord, VolumeRecord} from '../types';

const ChapterLinks: FC<{
  volume: VolumeRecord;
  book: BookRecord;
  closeSideNav: () => void;
}> = ({volume, book, closeSideNav}) => {
  const {data: {items: chapters = undefined} = {}} = useQuery(
    ['chapters', book.id],
    () => getAllChaptersByBookId(book.id),
  );

  return (
    <div className="flex flex-wrap pl-8">
      {chapters?.map(chapter => (
        <NavLink
          key={chapter.id}
          to={scriptureLinkHref(volume.title, book.title, chapter.number)}
          className="block m-2 p-2 w-12 h-12 text-center"
          activeClassName="bg-gray-700"
          onClick={closeSideNav}
        >
          {chapter.number}
        </NavLink>
      ))}
    </div>
  );
};

export default ChapterLinks;
