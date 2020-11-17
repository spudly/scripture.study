import React, {FC} from 'react';
import {compareBy, get} from '@spudly/pushpop';
import {useQuery} from 'react-query';
import {getAllVolumes} from '../api/api.client';
import Spinner from '../widgets/Spinner';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import Directory from './Directory';
import DirectoryItem from './DirectoryItem';

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
      {volumes.sort(compareOrder).map(volume => (
        <DirectoryItem key={volume.id} href={scriptureLinkHref(volume.title)}>
          {volume.title}
        </DirectoryItem>
      ))}
    </Directory>
  );
};

export default VolumeDirectory;
