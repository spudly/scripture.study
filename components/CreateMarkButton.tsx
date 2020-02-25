import React, { useState, FC } from "react";
import { Mark } from "../utils/types";
import { MdRecordVoiceOver } from "react-icons/md";
import classnames from "classnames";
import CircleButton from "../components/CircleButton";
import { VerseSelection } from "../utils/types";
import Select from "../components/Select";
import uuid from "uuid/v4";

const buildSpeakerMarks = (
  selections: Array<VerseSelection>,
  speakerId: string
): Array<Mark> =>
  selections.map(selection => ({
    ...selection,
    id: uuid(),
    type: "speaker",
    speakerId
  }));

const CreateMarkButton: FC<{
  selections: Array<VerseSelection>;
  createMarks: (marks: Array<Mark>) => void;
}> = ({ selections, createMarks }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0"
          onClick={() => setIsOpen(false)}
        />
      )}
      <CircleButton
        themeId="yellow"
        onClick={() => {
          window.getSelection()?.removeAllRanges();
          setIsOpen(is => !is);
        }}
      >
        <div className="whitespace-no-wrap">
          <div className="h-20 w-20 inline-flex align-middle justify-center items-center">
            <MdRecordVoiceOver />
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
                    createMarks(buildSpeakerMarks(selections, speaker));
                  }
                }}
              >
                {/* TODO: fetch these qith graphql */}
                <option />
                <option>angel</option>
                <option>isaiah-1</option>
                <option>holy-ghost</option>
                <option>jacob-2</option>
                <option>jesus-christ</option>
                <option>john-the-baptist</option>
                <option>joseph-1</option>
                <option>laban</option>
                <option>laman</option>
                <option>lehi-1</option>
                <option>lemuel</option>
                <option>nephi-1</option>
                <option>sariah</option>
              </Select>
            </div>
          </div>
        </div>
      </CircleButton>
    </>
  );
};

export default CreateMarkButton;
