const isNil = <T>(val: T | null | undefined): val is null | undefined =>
  val == null;

export default isNil;
