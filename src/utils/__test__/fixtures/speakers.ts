import {Speaker} from '../../types';

export const nephi1: Speaker = {id: '5e4b6285f30cfc3b0b065fcb', name: 'Nephi'};

export const nephi2: Speaker = {
  id: '5f48eb603c7b0409fccfc705',
  name: 'Nephi',
  description: 'Son of Helaman',
};

export const lehi1: Speaker = {id: '5e4b6285f30cfc3b0b065fc9', name: 'Lehi'};
export const lehi4: Speaker = {
  id: '5f48eb693c7b0409fccfc706',
  name: 'Lehi',
  description: 'Son of Helaman',
};

export const armyOfHelaman: Speaker = {
  id: '5f2a955e918764028ed01da3',
  description: 'Army of Helaman',
};

export const speakers: Array<Speaker> = [
  lehi1,
  nephi1,
  nephi2,
  lehi4,
  armyOfHelaman,
];
