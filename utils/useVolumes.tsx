import {getVolumes} from '../sandbox/indexeddb';
import createResource from './createResource';
import {Volume, Resource} from './types';

let cache: Resource<Array<Volume>> | null = null;

const useVolumes = (): Resource<Array<Volume>> =>
  cache ?? (cache = createResource(getVolumes));

export default useVolumes;
