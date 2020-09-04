import {
  armyOfHelaman,
  lehi1,
  lehi4,
  nephi1,
  nephi2,
} from './__test__/fixtures/speakers';
import compareSpeakers from './compareSpeakers';

test('compares by name first, then description', () => {
  expect(
    [lehi1, nephi1, nephi2, lehi4, armyOfHelaman].sort(compareSpeakers),
  ).toStrictEqual([armyOfHelaman, lehi1, lehi4, nephi1, nephi2]);
});
