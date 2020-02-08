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

type Result = { book: string; chapter: number; verses?: number[] };

const parseScriptureRef = (ref: string) => {
  const results: Array<Result> = [];
  ref.split(";").forEach(subRef => {
    const match = subRef
      .trim()
      .toLowerCase()
      .match(/^(\d*)\s*(\w+)\.?\s*(\d+)\s*(?:[:.]\s*([0-9,\s-]+))?$/);
    if (!match) {
      throw new Error("no match");
    }
    const [, bookNum, bookName, chapterString, versesRef] = match;
    const book = bookNum ? `${bookNum} ${bookName}` : bookName;
    const chapter = Number(chapterString);

    if (versesRef) {
      results.push({ book, chapter, verses: parseVerseRef(versesRef) });
    } else {
      results.push({ book, chapter });
    }
  });
  return results;
};

// export { Result };
export default parseScriptureRef;
