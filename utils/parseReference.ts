const simpleRange = (from: number, to: number): Array<number> => {
  let values: Array<number> = [];
  for (let i = from; i <= to; i++) {
    values.push(i);
  }
  return values;
};

const parseVerseRef = (ref: string): Array<number> => {
  const groups = ref.replace(/\s/g, "").split(",");
  const verses = [];
  for (const group of groups) {
    const rangeMatch = group.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const [from, to] = group.split("-");
      verses.push(...simpleRange(Number(from), Number(to)));
    } else if (group.match(/^\d+$/)) {
      verses.push(Number(group.trim()));
    } else {
      throw new Error(`Invalid Syntax: [${group}]`);
    }
  }
  return verses;
};

const normalize = (ref: string) =>
  ref
    .replace(/^[a-z]/, match => match.toUpperCase())
    .replace(
      /([^a-z])([a-z])/gi,
      (_, p1, p2) => `${p1} ${(p2 || "").toUpperCase()}`
    )
    .replace(/(\D)(\d)/g, "$1 $2")
    .replace(/\s{2,}/g, " ");

const parseRef = (ref: string) => {
  const match = ref
    .trim()
    .toLowerCase()
    .replace(/\s/g, "")
    .match(/^(\d*)([a-z]+)(\d+)(?:[.:]([\d,-]+))?$/);
  if (!match) {
    throw new Error(`no match for "${ref}"`);
  }
  const [, bookNum, bookName, chapterRef, versesRef] = match;
  const book = normalize(bookNum ? `${bookNum} ${bookName}` : bookName);
  const chapter = Number(chapterRef);
  if (versesRef) {
    const verses = parseVerseRef(versesRef);
    return { book, chapter, verses };
  }
  return { book, chapter };
};

export default parseRef;
