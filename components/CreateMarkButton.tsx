import React, { useState, FC } from "react";
import { Mark, Person } from "../utils/types";
import { MdRecordVoiceOver } from "react-icons/md";
import classnames from "classnames";
import CircleButton from "../components/CircleButton";
import { VerseSelection } from "../utils/types";
import Select from "../components/Select";
import Spinner from "./Spinner";

const buildSpeakerMarks = (
  selections: Array<VerseSelection>,
  speakerId: string
): Array<Omit<Mark, "id">> =>
  selections.map(selection => ({
    ...selection,
    type: "speaker",
    speakerId
  }));

const byName = (a: Person, b: Person) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();
  return aName < bName ? -1 : aName > bName ? 1 : 0;
};

const CreateMarkButton: FC<{
  selections: Array<VerseSelection>;
  createMarks: (marks: Array<Omit<Mark, "id">>) => void;
  isCreating?: boolean;
  people: Array<Person>;
}> = ({ selections, createMarks, isCreating, people }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 top-0 right-0 bottom-0 left-0"
          onClick={() => setIsOpen(false)}
        />
      )}
      <CircleButton
        themeId="yellow"
        onClick={e => setIsOpen(is => !is)}
        disabled={isCreating}
      >
        <div className="whitespace-no-wrap">
          <div className="h-20 w-20 inline-flex align-middle justify-center items-center">
            {isCreating ? <Spinner grow /> : <MdRecordVoiceOver />}
          </div>
          <div
            className={classnames(
              "inline-block align-middle text-base text-black overflow-hidden min-w-0 duration-200",
              {
                "max-w-64": isOpen,
                "max-w-0": !isOpen
              }
            )}
          >
            <div className="pr-6">
              <Select
                onClick={e => e.stopPropagation()}
                onChange={e => {
                  const speaker = e.currentTarget.value;
                  if (speaker) {
                    setIsOpen(false);
                    createMarks(buildSpeakerMarks(selections, speaker));
                  }
                }}
              >
                <option />
                {people.sort(byName).map(({ id, name, description }) => (
                  <option key={id} value={id}>
                    {description ? `${name}, ${description}` : name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </CircleButton>
    </>
  );
};

export default CreateMarkButton;
