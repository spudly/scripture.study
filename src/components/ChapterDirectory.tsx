import React, {FC} from 'react';
import Directory, {DirectoryItem} from './Directory';
import {get, compareBy} from '@spudly/pushpop';
import {queries} from '../data-sources/fetch';
import {useQuery} from 'react-query';
import Spinner from './reusable/Spinner';
import useScripturesRouteMatch from '../utils/useScripturesRouteMatch';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareNumber = compareBy(get('number'));

const BookDirectory: FC = () => {
  const {volumeTitle, bookTitle} = useScripturesRouteMatch();
  if (!volumeTitle || !bookTitle) {
    throw new Error('Missing volume or book title');
  }
  const {data: volume} = useQuery(`getVolumeByTitle(${volumeTitle})`, () =>
    queries.getVolumeByTitle(volumeTitle),
  );
  const {data: book} = useQuery(
    `getBookByTitle(${volume?.id}, ${bookTitle})`,
    () => queries.getBookByTitle(volume!.id, bookTitle),
    {enabled: volume && bookTitle},
  );
  const {
    data: chapters,
  } = useQuery(
    `getChaptersByBookId(${volume?.id}, ${book?.id})`,
    () => queries.getAllChaptersByBookId(volume!.id, book!.id),
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
