import { FC, useContext } from "react";
import MarksContext from "../contexts/MarksContext";
import CircleButton from "./CircleButton";

const scrollToSpeaker = (speakerId: string) => {
  const firstBySpeaker = document.querySelector(
    `[data-speaker-ids~="${speakerId}"]`
  );
  firstBySpeaker?.scrollIntoView({ behavior: "smooth" });
};

const SpeakerLegend: FC<{}> = () => {
  const { speakerIds } = useContext(MarksContext);

  // TODO: put the speaker objects in the context instead of just the speaker ids so that we can use the `name` field

  return (
    <>
      {speakerIds.map((speakerId, index) => (
        <div key={speakerId}>
          <CircleButton
            themeId={index}
            title={speakerId}
            onClick={() => scrollToSpeaker(speakerId)}
          >
            {speakerId[0]}
            {speakerId.match(/\d+$/)?.[0]}
          </CircleButton>
        </div>
      ))}
    </>
  );
};

export default SpeakerLegend;
