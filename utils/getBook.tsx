import findOrThrow from "./findOrThrow";
import getBooks from "./getBooks";
import memoize from "./memoize";

const getBook = memoize((volumeToken: string, bookToken: string) =>
  findOrThrow(b => b.token === bookToken, getBooks(volumeToken))
);

export default getBook;
