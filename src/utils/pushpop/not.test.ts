import not from './not';

test('not(() => true)() => false', () => {
  expect(not(() => true)()).toBe(false);
});

test('not(() => false)() => true', () => {
  expect(not(() => false)()).toBe(true);
});

test('practical example: is odd', () => {
  const isEven = (n: number) => n % 2 === 0;
  const isOdd = not(isEven);
  expect(isOdd(5)).toBe(true);
  expect(isOdd(4)).toBe(false);
});
