const last = <T>(list: Array<T>): T => {
  if (list.length === 0) {
    throw new Error("empty list");
  }
  return list[list.length - 1];
};

export default last;
