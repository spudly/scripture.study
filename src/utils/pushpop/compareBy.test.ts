import compareBy from './compareBy';

const getSortOrder = (x: {sortOrder: number}) => x.sortOrder;

test('a < b => -1', () => {
  const compare = compareBy(getSortOrder);
  expect(compare({sortOrder: 1}, {sortOrder: 2})).toBe(-1);
});

test('a == b => 0', () => {
  const compare = compareBy(getSortOrder);
  expect(compare({sortOrder: 2}, {sortOrder: 2})).toBe(0);
});

test('a > b => 1', () => {
  const compare = compareBy(getSortOrder);
  expect(compare({sortOrder: 2}, {sortOrder: 1})).toBe(1);
});

test('array sort', () => {
  const compare = compareBy(getSortOrder);
  expect(
    [
      {sortOrder: 4},
      {sortOrder: 9},
      {sortOrder: 5},
      {sortOrder: 7},
      {sortOrder: 6},
      {sortOrder: 9},
      {sortOrder: 2},
      {sortOrder: 1},
      {sortOrder: 8},
      {sortOrder: 3},
    ].sort(compare),
  ).toStrictEqual([
    {sortOrder: 1},
    {sortOrder: 2},
    {sortOrder: 3},
    {sortOrder: 4},
    {sortOrder: 5},
    {sortOrder: 6},
    {sortOrder: 7},
    {sortOrder: 8},
    {sortOrder: 9},
    {sortOrder: 9},
  ]);
});
