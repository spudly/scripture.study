const centerBy = <ITEM extends any>(
  fn: (item: ITEM) => unknown,
  items: Array<ITEM>,
): Array<ITEM> => {
  const index = items.findIndex(fn);
  if (index === -1) {
    return items;
  }
  const withoutItem = [...items.slice(0, index), ...items.slice(index + 1)];
  const centerIndex = Math.floor((items.length - 1) / 2);
  return [
    ...withoutItem.slice(0, centerIndex),
    items[index],
    ...withoutItem.slice(centerIndex),
  ];
};

export default centerBy;
