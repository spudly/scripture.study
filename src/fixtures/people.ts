import {PersonRecord} from '../types';
import {johnDoe} from './users';

export const nephi1: PersonRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: '641e7a5f-a910-4fc2-9a63-e8795461ce4e',
  name: 'Nephi',
  order: 1,
  description: 'Son of Lehi',
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
  circaBirth: null,
  circa: -600,
  circaDeath: null,
};

export const nephi2: PersonRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: '66855797-fc4a-4001-837c-9e1e7521b450',
  name: 'Nephi',
  order: 2,
  description: 'Son of Helaman',
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
  circaBirth: null,
  circa: -600,
  circaDeath: null,
};

export const lehi1: PersonRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: '1cc6d59d-c647-46d0-bc07-5b1ad6539ca2',
  name: 'Lehi',
  order: 1,
  description: null,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
  circaBirth: null,
  circa: -600,
  circaDeath: null,
};

export const sariah: PersonRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: '43cccd72-1e27-474a-af09-9a1a5da78dc0',
  name: 'Sariah',
  order: null,
  description: null,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
  circaBirth: null,
  circa: -600,
  circaDeath: null,
};

export const lehi4: PersonRecord = {
  id: 'ff0aca43-3d9b-43fd-a1fc-af4a685e59df',
  name: 'Lehi',
  order: 4,
  description: 'Son of Helaman',
  lastUpdatedBy: johnDoe.id,
  lastUpdatedDate: 41525,
  approvedBy: johnDoe.id,
  approvedDate: 10314,
  circaBirth: null,
  circa: -600,
  circaDeath: null,
};

export const armyOfHelaman: PersonRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: 'fb6d73e5-5717-4817-aa58-539b464779e0',
  name: null,
  order: null,
  description: 'Army of Helaman',
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
  circaBirth: null,
  circa: -600,
  circaDeath: null,
};

export default [lehi1, nephi1, nephi2, lehi4, sariah, armyOfHelaman];
