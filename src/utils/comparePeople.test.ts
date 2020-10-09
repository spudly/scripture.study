import {
  armyOfHelaman,
  lehi1,
  lehi4,
  nephi1,
  nephi2,
} from './__test__/fixtures/people';
import comparePeople from './comparePeople';

test('compares by name first, then description', () => {
  expect(
    [lehi1, nephi1, nephi2, lehi4, armyOfHelaman].sort(comparePeople),
  ).toStrictEqual([armyOfHelaman, lehi1, lehi4, nephi1, nephi2]);
});
