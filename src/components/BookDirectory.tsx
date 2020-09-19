import React, {FC} from 'react';
import Directory, {DirectoryItem} from './Directory';
import titleToRef from '../utils/titleToRef';
import {get, compareBy} from '@spudly/pushpop';
import {queries} from '../data-sources/fetch';
import {useQuery} from 'react-query';
import Spinner from './reusable/Spinner';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareSortPosition = compareBy(get('sortPosition'));

const BookDirectory: FC = () => {
  const {volumeTitle} = useScripturesRouteMatch();
  if (!volumeTitle) {
    throw new Error('Missing volume title');
  }
  const {data: volume} = useQuery(`getVolumeByTitle(${volumeTitle})`, () =>
    queries.getVolumeByTitle(volumeTitle),
  );
  const {data: books} = useQuery(
    `getAllBooksByVolumeId(${volume?.id})`,
    () => queries.getAllBooksByVolumeId(volume!.id),
    {enabled: volume},
  );

  if (!volume || !books) {
    return <Spinner />;
  }

  return (
    <Directory>
      {books.sort(compareSortPosition).map((book) => (
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
