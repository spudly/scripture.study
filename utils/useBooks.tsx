import {getBooksByVolumeId} from '../sandbox/indexeddb';
import createResource from './createResource';
import {Book, Resource} from './types';

const cache = new Map<string, Resource<Array<Book>>>();

const emptyArrayResource = createResource(() => Promise.resolve([]));

const useBooks = ({volumeId}: {volumeId?: string}): Resource<Array<Book>> => {
  if (!volumeId) {
    return emptyArrayResource;
  }
  let resource = cache.get(volumeId);
  if (!resource) {
    resource = createResource(() => getBooksByVolumeId(volumeId));
    cache.set(volumeId, resource);
  }
  return resource;
};

export default useBooks;
