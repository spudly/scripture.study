import {ID} from './records';
import './global';

export type Point = {x: number; y: number};

export type VerseSelection = {
  verseId: ID;
  startIndex: number | null;
  endIndex: number | null;
};

export type Layers = {
  speaker: boolean;
  mention: boolean;
};

export * from './api';
export * from './google';
export * from './records';
export * from './styling';
export * from './manifest';
