const get = <KEY extends string | number | symbol>(key: KEY) => <
  OBJ extends Record<KEY, any>
>(
  obj: OBJ,
): OBJ[KEY] => obj[key];

export default get;
