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

const useShowOnScrollUp = () => {
  const didScroll = useRef<boolean>(false);
  const lastPos = useRef<number>(0);
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => (didScroll.current = true);
    window.addEventListener("scroll", handleScroll);
    const id = window.setInterval(() => {
      if (didScroll.current) {
        const pos = document.documentElement.scrollTop;
        console.log(pos);

        if (pos > lastPos.current) {
          setShow(false);
        } else if (pos < lastPos.current) {
          setShow(true);
        }

        lastPos.current = pos;
        didScroll.current = false;
      }
    }, 250);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(id);
    };
  }, []);

  return show;
};

const SpeakerLegend: FC<{
  people: Array<Person>;
  speakerIds: Array<string>;
}> = ({ people, speakerIds }) => {
  const show = useShowOnScrollUp();
  return (
    <div
      className={classnames(
        "fixed left-0 p-4 flex flex-row w-full overflow-x-auto duration-500 overflow-y-hidden transform",
        {
          "-translate-y-32": !show,
          "translate-y-0": show
        }
      )}
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
