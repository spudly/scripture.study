import createId from './createId';

test('creates a unique id', () => {
  expect(createId()).not.toEqual(createId());
});

test('id has 24 characters', () => {
  expect(createId()).toHaveLength(24);
});
