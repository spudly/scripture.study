import { Mark } from "./types";

const sortMarks = (marks: Mark[]) =>
  marks.sort((a, b) => {
    if (!a.range && !b.range) {
      return 0;
    }
    if (!a.range) {
      return -1;
    }
    if (!b.range) {
      return 1;
    }
    return a.range[0] - b.range[0];
  });

export default sortMarks;
