import {getBooksByVolumeId} from '../sandbox/indexeddb';
import createResource from './createResource';
import {Resource} from './types';

const cache = new Map<string, Resource<any>>();

const useResource = <RESULT extends any>(
  fn: () => Promise<RESULT>,
  key: string,
): Resource<RESULT> => {
  let resource = cache.get(key);
  if (!resource) {
    resource = createResource(fn);
    cache.set(key, resource);
  }
  return resource;
};

export default useResource;
