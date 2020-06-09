const isNotNil = <T>(val: T | null | undefined): val is NonNullable<T> =>
  val != null;

export default isNotNil;
