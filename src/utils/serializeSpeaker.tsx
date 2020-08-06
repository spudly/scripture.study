import {Speaker} from './types';

const serializeSpeaker = ({name, description}: Speaker) =>
  [name, description].filter((x) => x != null).join(', ');

export default serializeSpeaker;
