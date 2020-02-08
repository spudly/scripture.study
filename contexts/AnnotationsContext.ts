import { createContext } from "react";

type Value = {
  speakers: Array<string>;
};

const AnnotationsContext = createContext<Value>({ speakers: [] });

export default AnnotationsContext;
