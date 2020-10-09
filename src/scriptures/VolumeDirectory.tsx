import React, {FC} from 'react';
import Directory, {DirectoryItem} from './Directory';
import {get, compareBy} from '@spudly/pushpop';
import {queries} from '../api/api.client';
import {useQuery} from 'react-query';
import Spinner from '../widgets/Spinner';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareOrder = compareBy(get('order'));

const VolumeDirectory: FC = () => {
  const {data: volumes} = useQuery('volumes', queries.getAllVolumes);

  if (!volumes) {
    return <Spinner />;
  }

  return (
    <Directory>
      {volumes.sort(compareOrder).map((volume) => (
        <DirectoryItem key={volume.id} href={scriptureLinkHref(volume.title)}>
          {volume.longTitle}
        </DirectoryItem>
      ))}
    </Directory>
  );
};

export default VolumeDirectory;
