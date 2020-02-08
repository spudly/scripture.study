import { FC, useContext } from "react";
import classnames from "classnames";
import AnnotationsContext from "../contexts/AnnotationsContext";
import theme from "../data/themes";

const scrollToSpeaker = (speaker: string) => {
  const firstBySpeaker = document.querySelector(`[data-speaker="${speaker}"]`);
  firstBySpeaker?.scrollIntoView({ behavior: "smooth" });
};

const SpeakerLegend: FC<{}> = () => {
  const { speakers } = useContext(AnnotationsContext);

  return (
    <div className="fixed top-0">
      {speakers.map((speaker, index) => (
        <button
          key={speaker}
          className={classnames(
            "inline-flex sm:flex text-4xl w-20 h-20 rounded-full uppercase items-center justify-center focus:outline-none focus:shadow-outline shadow-lg m-2 cursor-pointer",
            theme(index)
          )}
          title={speaker}
          onClick={() => scrollToSpeaker(speaker)}
        >
          {speaker[0]}
          {speaker.match(/\d+$/)?.[0]}
        </button>
      ))}
    </div>
  );
};

export default SpeakerLegend;
