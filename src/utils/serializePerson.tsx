import {PersonRecord} from './types';

const serializePerson = ({name, biography}: PersonRecord) =>
  [name, biography].filter((x) => x != null).join(', ');

export default serializePerson;
