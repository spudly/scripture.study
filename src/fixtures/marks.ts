import {MarkRecord} from '../types';
import {firstNephi2Verse1, firstNephi2Verse2} from './verses';
import {nephi1} from './people';
import {johnDoe} from './users';

export const mark1: MarkRecord = {
  lastUpdatedDate: 1602123209459,
  approvedDate: 1602123209459,
  id: 'c4dec3de-8ce0-402d-b8c9-e60c6a01329e',
  type: 'speaker',
  startIndex: null,
  endIndex: null,
  verseId: firstNephi2Verse1.id,
  speakerId: nephi1.id,
  personId: null,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const mark2: MarkRecord = {
  lastUpdatedDate: 1602123209459,
  approvedDate: 1602123209459,
  id: 'f4dddca8-6022-4b5b-9dd2-41f08055a8fc',
  type: 'speaker',
  startIndex: null,
  endIndex: null,
  verseId: firstNephi2Verse2.id,
  speakerId: nephi1.id,
  personId: null,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export default [mark1, mark2];
