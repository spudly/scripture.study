import findOrThrow from "./findOrThrow";
import getVerses from "./getVerses";

const getVerse = (
  volumeToken: string,
  bookToken: string,
  chapterToken: string,
  verseToken: string
) =>
  findOrThrow(
    v => v.token === verseToken,
    getVerses(volumeToken, bookToken, chapterToken)
  );

export default getVerse;
