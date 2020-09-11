import {Speaker} from './types';
import serializeSpeaker from './serializeSpeaker';
import {compareBy} from '@spudly/pushpop';

const compareSpeakers = compareBy((s: Speaker) =>
  serializeSpeaker(s).toLowerCase(),
);

export default compareSpeakers;
