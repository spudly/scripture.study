import { Annotation } from "./types";

const sortAnnotations = (annotations: Annotation[]) =>
  annotations.sort((a, b) => {
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

export default sortAnnotations;
