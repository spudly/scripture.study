const pick = <K extends string | number | symbol>(keys: Array<K>) => <
  SOURCE extends Record<K, any>
>(
  source: SOURCE,
): Pick<SOURCE, K> =>
  keys.reduce((prev, key) => ({...prev, [key]: source[key]}), {}) as Pick<
    SOURCE,
    K
  >;

export default pick;
