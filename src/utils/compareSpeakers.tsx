import {Speaker} from '../utils/types';
import serializeSpeaker from './serializeSpeaker';

const compareSpeakers = (a: Speaker, b: Speaker) => {
  const aValue = serializeSpeaker(a);
  const bValue = serializeSpeaker(b);
  return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
};

export default compareSpeakers;
