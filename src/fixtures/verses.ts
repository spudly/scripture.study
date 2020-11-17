import {VerseRecord} from '../types';
import {firstNephi2} from './chapters';
import {johnDoe} from './users';

export const firstNephi1Verse1: VerseRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: '107a7671-5ee2-4764-a049-d85ff95f7862',
  number: 1,
  text:
    'I, Nephi, having been born of goodly parents, therefore I was taught somewhat in all the learning of my father; and having seen many afflictions in the course of my days, nevertheless, having been highly favored of the Lord in all my days; yea, having had a great knowledge of the goodness and the mysteries of God, therefore I make a record of my proceedings in my days.',
  chapterId: firstNephi2.id,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const firstNephi1Verse2: VerseRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: 'f688bd68-ceda-41bf-bf58-8a6e66a8b941',
  number: 2,
  text:
    'Yea, I make a record in the language of my father, which consists of the learning of the Jews and the language of the Egyptians.',
  chapterId: firstNephi2.id,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export default [firstNephi1Verse1, firstNephi1Verse2];
