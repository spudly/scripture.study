import {getVolumeByTitle} from '../sandbox/indexeddb';
import createResource from './createResource';
import {Volume, Resource} from './types';

const cache = new Map<string, Resource<Volume | null>>();

const useVolume = ({title}: {title: string}): Resource<Volume | null> => {
  let resource = cache.get(title);
  if (!resource) {
    resource = createResource(() => getVolumeByTitle(title));
    cache.set(title, resource);
  }
  return resource;
};

export default useVolume;
