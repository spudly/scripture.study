import { FC, useContext } from "react";
import MarksContext from "../contexts/MarksContext";
import CircleButton from "./CircleButton";
import { Person } from "../utils/types";

const first = (x: ArrayLike<any>) => x[0];

const initials = (name: string) =>
  name
    .split(/[^a-z]+/i)
    .filter(n => n.match(/^[A-Z]/))
    .map(first)
    .join("");

const scrollToSpeaker = (speakerId: string) => {
  const firstBySpeaker = document.querySelector(
    `[data-speaker-ids~="${speakerId}"]`
  );
  firstBySpeaker?.scrollIntoView({ behavior: "smooth" });
};

const SpeakerLegend: FC<{ people: Array<Person> }> = ({ people }) => {
  const { speakerIds } = useContext(MarksContext);

  return (
    <div className="fixed top-0 left-0 p-4 flex flex-row sm:flex-col w-full h-auto sm:w-auto sm:h-full overflow-x-auto sm:overflow-y-auto">
      {speakerIds.map((speakerId, index) => {
        const person = people.find(p => p.id === speakerId);
        if (!person) {
          throw new Error("Missing person!");
        }
        return (
          <div key={speakerId}>
            <CircleButton
              themeId={index}
              title={person.name}
              onClick={() => scrollToSpeaker(speakerId)}
            >
              {initials(person.name).slice(0, 2)}
            </CircleButton>
          </div>
        );
      })}
    </div>
  );
};

export default SpeakerLegend;
