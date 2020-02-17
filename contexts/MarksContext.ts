import { createContext } from "react";

type Value = {
  speakers: Array<string>;
};

const MarksContext = createContext<Value>({ speakers: [] });

export default MarksContext;
