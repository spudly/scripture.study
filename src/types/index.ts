import {ID} from './records';

export type Point = {x: number; y: number};

export type VerseSelection = {
  verseId: ID;
  startIndex: number | null;
  endIndex: number | null;
};

export * from './api';
export * from './global';
export * from './google';
export * from './records';
export * from './styling';
export * from './manifest';
export * from './service-worker';
