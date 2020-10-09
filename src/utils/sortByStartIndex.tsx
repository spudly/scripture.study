const sortByStartIndex = <ITEM extends {startIndex: number | null}>(
  items: Array<ITEM>,
): Array<ITEM> =>
  [...items].sort((a, b) => {
    if (a.startIndex == null && b.startIndex == null) {
      return 0;
    }
    if (a.startIndex == null) {
      return -1;
    }
    if (b.startIndex == null) {
      return 1;
    }
    return a.startIndex - b.startIndex;
  });

export default sortByStartIndex;
