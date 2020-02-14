const first = <T>(list: Array<T>): T => {
  if (list.length === 0) {
    throw new Error("empty list");
  }
  return list[0];
};

export default first;
