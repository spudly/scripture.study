import type {ChapterRecord} from '../types';
import {firstNephi, revelation} from './books';
import {johnDoe} from './users';

export const firstNephi1: ChapterRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: 'c272d6b4-cd56-470e-9da5-104769d6da8d',
  bookId: firstNephi.id,
  number: 1,
  summary: null,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const firstNephi2: ChapterRecord = {
  lastUpdatedDate: 1602028800000,
  approvedDate: 1602028800000,
  id: '415a9642-bf96-46ca-8b23-4cbdb3128b2a',
  bookId: firstNephi.id,
  number: 2,
  summary: null,
  lastUpdatedBy: johnDoe.id,
  approvedBy: johnDoe.id,
};

export const revelation22: ChapterRecord = {
  approvedBy: johnDoe.id,
  approvedDate: 1602028800000,
  bookId: revelation.id,
  id: '2596e4a0-26fd-4123-b13f-3132006362bf',
  lastUpdatedBy: johnDoe.id,
  lastUpdatedDate: 1602028800000,
  number: 22,
  summary: null,
};

export default [firstNephi1, firstNephi2, revelation22];
