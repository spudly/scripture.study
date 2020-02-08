// TODO: move to pure-fns and come up with a better name

const findOrThrow = <T extends any>(
  getter: (item: T) => unknown,
  list: Array<T>
): T => {
  const result = list.find(getter);
  if (result === undefined) {
    throw new Error("Not Found");
  }
  return result;
};

export default findOrThrow;
