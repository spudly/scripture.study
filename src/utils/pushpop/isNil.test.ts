import isNil from './isNil';

test('returns true if the value is null | undefined', () => {
  expect(isNil(null)).toBe(true);
  expect(isNil(undefined)).toBe(true);
});

test('returns false if the value is not null or undefined', () => {
  expect(isNil(1)).toBe(false);
  expect(isNil(new Date())).toBe(false);
  expect(isNil(false)).toBe(false);
  expect(isNil(Number.NaN)).toBe(false);
});
