const where = <ITEM extends { [key: string]: any }>(query: Partial<ITEM>) => (
  item: ITEM
): boolean => Object.keys(query).every(k => item[k] === query[k]);

export default findWhere;
