import { FC, useContext } from "react";
import classnames from "classnames";
import AnnotationsContext from "../contexts/AnnotationsContext";
import theme from "../data/themes";

const scrollToSpeaker = (speaker: string) => {
  const firstBySpeaker = document.querySelector(
    `[data-speakers~="${speaker}"]`
  );
  firstBySpeaker?.scrollIntoView({ behavior: "smooth" });
};

const SpeakerLegend: FC<{}> = () => {
  const { speakers } = useContext(AnnotationsContext);

  return (
    <>
      {speakers.map((speaker, index) => (
        <button
          key={speaker}
          className={classnames(
            "inline-flex flex-shrink-0 text-4xl w-20 h-20 rounded-full uppercase items-center justify-center focus:outline-none focus:shadow-outline shadow-lg m-2 cursor-pointer",
            theme(index)
          )}
          title={speaker}
          onClick={() => scrollToSpeaker(speaker)}
        >
          {speaker[0]}
          {speaker.match(/\d+$/)?.[0]}
        </button>
      ))}
    </>
  );
};

export default SpeakerLegend;
