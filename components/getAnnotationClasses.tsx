import { Annotation } from "../utils/types";
import theme from "../data/themes";

const getAnnotationClasses = (
  annotations: Annotation[],
  allSpeakers: Array<string>
) => {
  const classes = ["py-4"];
  for (const note of annotations) {
    classes.push(
      ...theme(allSpeakers.indexOf(note.speaker), {
        states: ["default"],
        colors: ["bgColor", "textColor"]
      })
    );
  }
  return classes.join(" ");
};

export default getAnnotationClasses;
