import {compareBy} from '@spudly/pushpop';
import {PersonRecord} from '../types';
import {serializePerson} from './serializePerson';

const comparePeople = compareBy((s: PersonRecord) =>
  serializePerson(s).toLowerCase(),
);

export default comparePeople;
