/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC} from 'react';
import {compareBy, get} from '@spudly/pushpop';
import {useQuery} from 'react-query';
import {
  getAllChaptersByBookId,
  getBookByVolumeIdAndTitle,
  getVolumeByTitle,
} from '../api/api.client';
import Spinner from '../widgets/Spinner';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import Directory from './Directory';
import DirectoryItem from './DirectoryItem';

const compareNumber = compareBy(get('number'));

const BookDirectory: FC = () => {
  const {volumeTitle, bookTitle} = useScripturesRouteMatch();
  if (!volumeTitle || !bookTitle) {
    throw new Error('Missing volume or book title');
  }
  const {data: volume} = useQuery(['volumes', volumeTitle], () =>
    getVolumeByTitle(volumeTitle),
  );
  const {data: book} = useQuery(
    ['books', volume?.id, bookTitle],
    () => getBookByVolumeIdAndTitle(volume!.id, bookTitle),
    {enabled: volume != null},
  );
  const {data: {items: chapters = undefined} = {}} = useQuery(
    ['chapters', book?.id],
    () => getAllChaptersByBookId(book!.id),
    {enabled: volume != null && book != null},
  );

  if (!volume || !book || !chapters) {
    return <Spinner />;
  }

  return (
    <Directory>
      {chapters.sort(compareNumber).map(chapter => (
        <DirectoryItem
          key={chapter.id}
          href={scriptureLinkHref(volume.title, book.title, chapter.number)}
        >
          {chapter.number}
        </DirectoryItem>
      ))}
    </Directory>
  );
};

export default BookDirectory;
