const compareNumberProperty = <T extends {number: number}>(
  a: T,
  b: T,
): number => a.number - b.number;

export default compareNumberProperty;
