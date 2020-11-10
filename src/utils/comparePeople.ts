import {PersonRecord} from '../types';

const comparePeople = (a: PersonRecord, b: PersonRecord) => {
  const aName = a.name ?? a.description ?? '';
  const bName = b.name ?? b.description ?? '';

  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  if (a.order == null && b.order != null) {
    return -1;
  } else if (a.order != null && b.order == null) {
    return 1;
  } else if (a.order != null && b.order != null) {
    return a.order - b.order;
  }
  return 0;
};

export default comparePeople;
