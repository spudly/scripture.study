import type {BookRecord} from '../types';
import {johnDoe} from './users';
import {bookOfMormon, newTestament} from './volumes';

export const revelation: BookRecord = {
  abbr: 'Rev.',
  approvedBy: johnDoe.id,
  approvedDate: 1601942400000,
  id: 'dda98deb-4c6f-4b59-bc10-1aa9503e7a61',
  lastUpdatedBy: johnDoe.id,
  lastUpdatedDate: 1601942400000,
  longTitle: 'The Revelation of St John the Divine',
  order: 66,
  subtitle: '',
  title: 'Revelation',
  volumeId: newTestament.id,
};

export const firstNephi: BookRecord = {
  lastUpdatedDate: 1601942400000,
  approvedDate: 1601942400000,
  id: '02504a2a-3e07-4e10-95c3-2015a839a2e5',
  title: '1 Nephi',
  longTitle: 'The First Book of Nephi',
  subtitle: 'His Reign and Ministry',
  volumeId: bookOfMormon.id,
  order: 67,
  abbr: '1 Ne.',
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const secondNephi: BookRecord = {
  lastUpdatedDate: 1601942400000,
  approvedDate: 1601942400000,
  id: '683d26fc-6566-4dfb-8ea8-f78dabb4eb1a',
  title: '2 Nephi',
  longTitle: 'The Second Book of Nephi',
  subtitle: '',
  volumeId: bookOfMormon.id,
  order: 68,
  abbr: '2 Ne.',
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export default [firstNephi, secondNephi, revelation];
