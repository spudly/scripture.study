import {PersonRecord} from '../../types';

export const nephi1: PersonRecord = {
  id: '5e4b6285f30cfc3b0b065fcb',
  name: 'Nephi',
  biography: null,
};

export const nephi2: PersonRecord = {
  id: '5f48eb603c7b0409fccfc705',
  name: 'Nephi',
  biography: 'Son of Helaman',
};

export const lehi1: PersonRecord = {
  id: '5e4b6285f30cfc3b0b065fc9',
  name: 'Lehi',
  biography: null,
};
export const lehi4: PersonRecord = {
  id: '5f48eb693c7b0409fccfc706',
  name: 'Lehi',
  biography: 'Son of Helaman',
};

export const armyOfHelaman: PersonRecord = {
  id: '5f2a955e918764028ed01da3',
  name: null,
  biography: 'Army of Helaman',
};

export const speakers: Array<PersonRecord> = [
  lehi1,
  nephi1,
  nephi2,
  lehi4,
  armyOfHelaman,
];
