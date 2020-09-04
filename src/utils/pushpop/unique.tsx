const unique = <ITEM extends any, LIST extends Array<ITEM>>(list: LIST): LIST =>
  [...new Set(list)] as LIST;

export default unique;
