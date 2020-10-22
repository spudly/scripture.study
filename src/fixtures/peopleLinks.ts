import {PersonLinkRecord} from '../utils/types';
import {nephi1, lehi1, sariah} from './people';
import {johnDoe} from './users';

export const nephiToLehi: PersonLinkRecord = {
  lastUpdatedDate: 1602589864307,
  approvedDate: 1602589864307,
  id: '818c2e55-4386-445b-b1f0-da36fc4ce44a',
  fromPersonId: nephi1.id,
  type: 'childOf',
  toPersonId: lehi1.id,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const nephiToSariah: PersonLinkRecord = {
  lastUpdatedDate: 1602590177519,
  approvedDate: 1602590177519,
  id: 'ce1d4d08-1051-4f4c-ad5a-21f4309edb4f',
  fromPersonId: nephi1.id,
  type: 'childOf',
  toPersonId: sariah.id,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export default [nephiToLehi, nephiToSariah];
