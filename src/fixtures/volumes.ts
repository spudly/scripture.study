import {VolumeRecord} from '../utils/types';
import {johnDoe} from './users';

export const oldTestament: VolumeRecord = {
  lastUpdatedDate: 1601942400000,
  approvedDate: 1601942400000,
  id: '657361be-db0b-4414-8125-60636b715654',
  title: 'Old Testament',
  longTitle: 'The Old Testament',
  abbr: 'OT',
  order: 1,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const bookOfMormon: VolumeRecord = {
  lastUpdatedDate: 1601942400000,
  approvedDate: 1601942400000,
  id: 'eb4dde99-f184-4fca-8f3e-1ca937b1e551',
  title: 'Book of Mormon',
  longTitle: 'The Book of Mormon',
  abbr: 'BoM',
  order: 3,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export default [oldTestament, bookOfMormon];
