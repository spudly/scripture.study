/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useCallback} from 'react';
import Directory, {DirectoryItem} from './Directory';
import {get, compareBy} from '@spudly/pushpop';
import {queries} from '../api/api.client';
import {useQuery} from 'react-query';
import Spinner from '../widgets/Spinner';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareNumber = compareBy(get('number'));

const BookDirectory: FC = () => {
  const {volumeTitle, bookTitle} = useScripturesRouteMatch();
  if (!volumeTitle || !bookTitle) {
    throw new Error('Missing volume or book title');
  }
  const {data: volume} = useQuery(
    ['volumes', volumeTitle],
    useCallback((key, title) => queries.getVolumeByTitle(title), []),
  );
  const {data: book} = useQuery(
    ['books', volume?.id, bookTitle],
    useCallback(
      (key, volumeId, title) => queries.getBookByTitle(volumeId, title),
      [volume, bookTitle],
    ),
    {enabled: volume && bookTitle},
  );
  const {data: chapters} = useQuery(
    ['chapters', volume?.id, book?.id],
    useCallback(
      (key, volumeId, bookId) =>
        queries.getAllChaptersByBookId(volumeId, bookId),
      [volume, book],
    ),
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
