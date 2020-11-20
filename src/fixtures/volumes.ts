import {VolumeRecord} from '../types';
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

export const newTestament: VolumeRecord = {
  abbr: 'NT',
  approvedBy: johnDoe.id,
  approvedDate: 1601942400000,
  id: '26040548-a2fb-4da9-86de-995f8415a48b',
  lastUpdatedBy: johnDoe.id,
  lastUpdatedDate: 1601942400000,
  longTitle: 'The New Testament',
  order: 2,
  title: 'New Testament',
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

export default [oldTestament, newTestament, bookOfMormon];
