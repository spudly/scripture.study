import React, {FC} from 'react';
import Directory, {DirectoryItem} from './Directory';
import {compareBy, get} from '@spudly/pushpop';
import {getAllVolumes} from '../api/api.client';
import {useQuery} from 'react-query';
import Spinner from '../widgets/Spinner';
import scriptureLinkHref from '../utils/scriptureLinkHref';

const compareOrder = compareBy(get('order'));

const VolumeDirectory: FC = () => {
  const {data: {items: volumes = undefined} = {}} = useQuery(
    'volumes',
    getAllVolumes,
  );

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
