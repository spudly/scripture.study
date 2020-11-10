import compareVersions from './compareVersions';

test('sorts versions correctly', () => {
  expect(
    ['13.1', '13', '10.54.768', '10', '7.8.9', '4.5.6', '1.2.3', '1', '0'].sort(
      compareVersions,
    ),
  ).toStrictEqual([
    '0',
    '1',
    '1.2.3',
    '4.5.6',
    '7.8.9',
    '10',
    '10.54.768',
    '13',
    '13.1',
  ]);
});
