import findOrThrow from "./findOrThrow";
import getChapters from "./getChapters";
import memoize from "./memoize";

const getChapter = memoize(
  (volumeToken: string, bookToken: string, chapterToken: string) =>
    findOrThrow(
      c => c.token === chapterToken,
      getChapters(volumeToken, bookToken)
    )
);

export default getChapter;
