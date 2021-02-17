import type {PersonLinkRecord, PersonRecord} from '../types';
import buildTree, {getRelativePosition} from './buildTree';

const makePerson = (name: string): PersonRecord => ({
  id: name,
  name,
  order: null,
  description: null,
  lastUpdatedBy: 'test',
  lastUpdatedDate: Date.now(),
  approvedBy: 'test',
  approvedDate: Date.now(),
});

const makeLink = (
  from: PersonRecord,
  type: PersonLinkRecord['type'],
  to: PersonRecord,
): PersonLinkRecord => ({
  id: `${from.id};${type};${to.id}`,
  fromPersonId: from.id,
  toPersonId: to.id,
  type,
  lastUpdatedBy: 'test',
  lastUpdatedDate: Date.now(),
  approvedBy: 'test',
  approvedDate: Date.now(),
});

describe('getRelativePosition', () => {
  test('gets relative possion', () => {
    expect(getRelativePosition('childOf')).toBe('below');
    expect(getRelativePosition('spouseOf')).toBe('beside');
    expect(getRelativePosition('descendantOf')).toBe('below+');
    expect(getRelativePosition('contemporaryOf')).toBe('beside++');
  });

  test('if reverse is true, gets opposite position', () => {
    expect(getRelativePosition('childOf', true)).toBe('above');
    expect(getRelativePosition('spouseOf', true)).toBe('beside');
    expect(getRelativePosition('descendantOf', true)).toBe('above+');
    expect(getRelativePosition('contemporaryOf', true)).toBe('beside++');
  });
});

describe('buildTree', () => {
  test('places children below parents', () => {
    const adam = makePerson('adam');
    const seth = makePerson('seth');
    const enos = makePerson('enos');
    const persons = [adam, seth, enos];
    const links = [
      makeLink(seth, 'childOf', adam),
      makeLink(enos, 'childOf', seth),
    ];
    expect(buildTree(links, persons)).toStrictEqual([
      ['adam'],
      ['seth'],
      ['enos'],
    ]);
  });

  test('places descendents 2 rows below ancestors', () => {
    const a = makePerson('a');
    const b = makePerson('b');
    const c = makePerson('c');
    const persons = [a, b, c];
    const links = [
      makeLink(b, 'descendantOf', a),
      makeLink(c, 'descendantOf', b),
    ];
    expect(buildTree(links, persons)).toStrictEqual([
      ['a'],
      [],
      ['b'],
      [],
      ['c'],
    ]);
  });

  test('places spouses on the same row', () => {
    const a = makePerson('a');
    const b = makePerson('b');
    const c = makePerson('c');
    const persons = [a, b, c];
    const links = [makeLink(b, 'spouseOf', a), makeLink(c, 'spouseOf', a)];
    expect(buildTree(links, persons)).toStrictEqual([['a', 'b', 'c']]);
  });

  test('places contemporaries on the same row', () => {
    const a = makePerson('a');
    const b = makePerson('b');
    const c = makePerson('c');
    const persons = [a, b, c];
    const links = [
      makeLink(b, 'contemporaryOf', a),
      makeLink(c, 'contemporaryOf', a),
    ];
    expect(buildTree(links, persons)).toStrictEqual([['a', 'b', 'c']]);
  });
});
