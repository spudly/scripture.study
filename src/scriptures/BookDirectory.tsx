import React, {FC, useCallback} from 'react';
import Directory, {DirectoryItem} from './Directory';
import {get, compareBy} from '@spudly/pushpop';
import {getVolumeByTitle, getAllBooksByVolumeId} from '../api/api.client';
import {useQuery} from 'react-query';
import Spinner from '../widgets/Spinner';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareOrder = compareBy(get('order'));

const BookDirectory: FC = () => {
  const {volumeTitle} = useScripturesRouteMatch();
  if (!volumeTitle) {
    throw new Error('Missing volume title');
  }
  const {data: volume} = useQuery(
    ['volumes', volumeTitle],
    useCallback((key, title) => getVolumeByTitle(title), []),
  );
  const {data: {items: books = undefined} = {}} = useQuery(
    ['books', volume?.id],
    useCallback((key, volumeId) => getAllBooksByVolumeId(volumeId), []),
    {enabled: volume},
  );

  if (!volume || !books) {
    return <Spinner />;
  }

  return (
    <Directory>
      {books.sort(compareOrder).map((book) => (
        <DirectoryItem
          key={book.id}
          href={scriptureLinkHref(volume.title, book.title)}
        >
          {book.title}
        </DirectoryItem>
      ))}
    </Directory>
  );
};

export default BookDirectory;
