import { FC, useContext } from "react";
import classnames from "classnames";
import MarksContext from "../contexts/MarksContext";
import CircleButton from "./CircleButton";

const scrollToSpeaker = (speaker: string) => {
  const firstBySpeaker = document.querySelector(
    `[data-speakers~="${speaker}"]`
  );
  firstBySpeaker?.scrollIntoView({ behavior: "smooth" });
};

const SpeakerLegend: FC<{}> = () => {
  const { speakers } = useContext(MarksContext);

  return (
    <>
      {speakers.map((speaker, index) => (
        <div key={speaker}>
          <CircleButton
            themeId={index}
            title={speaker}
            onClick={() => scrollToSpeaker(speaker)}
          >
            {speaker[0]}
            {speaker.match(/\d+$/)?.[0]}
          </CircleButton>
        </div>
      ))}
    </>
  );
};

export default SpeakerLegend;
