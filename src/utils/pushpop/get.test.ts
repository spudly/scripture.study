import get from './get';

test('gets a property', () => {
  expect(get('number')({number: 42})).toBe(42);
});
