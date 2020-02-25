import { createContext } from "react";

type Value = {
  speakerIds: Array<string>;
};

const MarksContext = createContext<Value>({ speakerIds: [] });

export default MarksContext;
