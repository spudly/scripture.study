import React, {FC} from 'react';
import Directory, {DirectoryItem} from './Directory';
import {get, compareBy} from '@spudly/pushpop';
import {queries} from '../data-sources/fetch';
import {useQuery} from 'react-query';
import Spinner from './reusable/Spinner';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareSortPosition = compareBy(get('sortPosition'));

const VolumeDirectory: FC = () => {
  const {data: volumes} = useQuery('getAllVolumes', queries.getAllVolumes);

  if (!volumes) {
    return <Spinner />;
  }

  return (
    <Directory>
      {volumes.sort(compareSortPosition).map((volume) => (
        <DirectoryItem key={volume.id} href={scriptureLinkHref(volume.title)}>
          {volume.longTitle}
        </DirectoryItem>
      ))}
    </Directory>
  );
};

export default VolumeDirectory;
