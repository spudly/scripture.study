// TODO: move to @spudly/pushpop

const uniqBy = <ITEM extends any, X>(
  fn: (item: ITEM) => X,
  list: Array<ITEM>,
): Array<ITEM> => {
  const seen = new Map();
  const uniqItems: Array<ITEM> = [];
  list.forEach((item: ITEM) => {
    const result = fn(item);
    if (!seen.has(result)) {
      uniqItems.push(item);
      seen.set(result, true);
    }
  });
  return uniqItems;
};

export default uniqBy;
