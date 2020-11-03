/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback} from 'react';
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
  const {data: volume} = useQuery(
    ['volumes', volumeTitle],
    useCallback((key, title) => getVolumeByTitle(title), []),
  );
  const {data: book} = useQuery(
    ['books', volume?.id, bookTitle],
    useCallback(
      (key, volumeId, title) => getBookByVolumeIdAndTitle(volumeId, title),
      [volume, bookTitle],
    ),
    {enabled: volume && bookTitle},
  );
  const {data: {items: chapters = undefined} = {}} = useQuery(
    ['chapters', book?.id],
    useCallback((key, bookId) => getAllChaptersByBookId(bookId), [
      volume,
      book,
    ]),
    {enabled: volume && book},
  );

  if (!volume || !book || !chapters) {
    return <Spinner />;
  }

  return (
    <Directory>
      {chapters.sort(compareNumber).map((chapter) => (
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
