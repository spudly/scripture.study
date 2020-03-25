import { FC, useRef, useEffect, useState } from "react";
import classnames from "classnames";
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

const usNavPosition = (height: number) => {
  const didScroll = useRef<boolean>(false);
  const lastPos = useRef<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const pos = document.documentElement.scrollTop;
      if (pos > lastPos.current) {
        setY(Math.max(-height, -pos));
      } else if (pos < lastPos.current) {
        setY(0);
      }
      lastPos.current = pos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return y;
};

const SpeakerLegend: FC<{
  people: Array<Person>;
  speakerIds: Array<string>;
}> = ({ people, speakerIds }) => {
  const y = usNavPosition(128);
  return (
    <div
      className="fixed left-0 top-0 p-4 flex flex-row w-full overflow-x-auto duration-500"
      style={{
        transform: `translateY(${y}px)`,
        opacity: y === 0 ? 1 : 0
      }}
    >
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
