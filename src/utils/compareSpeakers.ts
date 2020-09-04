import {Speaker} from './types';
import serializeSpeaker from './serializeSpeaker';
import compareBy from './pushpop/compareBy';

const compareSpeakers = compareBy((s: Speaker) =>
  serializeSpeaker(s).toLowerCase(),
);

export default compareSpeakers;
