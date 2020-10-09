import {PersonRecord} from './types';
import serializePerson from './serializePerson';
import {compareBy} from '@spudly/pushpop';

const comparePeople = compareBy((s: PersonRecord) =>
  serializePerson(s).toLowerCase(),
);

export default comparePeople;
