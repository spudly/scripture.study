const isObject = (
  value: unknown,
): value is {
  [key: string]: unknown;
} => typeof value === 'object' && value !== null;

export default isObject;
