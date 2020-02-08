// TODO: move to pure-fns
const memoize = <
  ARGS extends Array<any>,
  RESULT extends any,
  FN extends (...args: ARGS) => RESULT
>(
  fn: (...args: ARGS) => RESULT,
  serialize: (...args: ARGS) => string = (...args) => args.join(";")
): ((...args: ARGS) => RESULT) => {
  const results = new Map<any, any>();
  return (...args) => {
    const key = serialize(...args);
    if (results.has(key)) {
      return results.get(key);
    }
    const result = fn(...args);
    results.set(key, result);
    return result;
  };
};

export default memoize;
