const not = <ARGS extends Array<any>>(fn: (...args: ARGS) => any) => (
  ...args: ARGS
) => !fn(...args);

export default not;
