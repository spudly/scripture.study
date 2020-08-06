import React, {useState, FC} from 'react';
import {Mark, Speaker} from '../utils/types';
import {MdRecordVoiceOver} from 'react-icons/md';
import classnames from 'classnames';
import CircleButton from '../components/CircleButton';
import {VerseSelection} from '../utils/types';
import Spinner from './Spinner';
import createId from '../utils/createId';
import SpeakerSelect from './SpeakerSelect';

const buildSpeakerMarks = (
  selections: Array<VerseSelection>,
  speakerId: string,
): Array<Mark> =>
  selections.map((selection) => ({
    ...selection,
    id: createId(),
    type: 'speaker',
    isActive: true,
    lastUpdated: Date.now(),
    speakerId,
  }));

const CreateMarkButton: FC<{
  selections: Array<VerseSelection>;
  createMarks: (marks: Array<Mark>) => void;
  isCreating?: boolean;
  speakers: Array<Speaker>;
}> = ({selections, createMarks, isCreating, speakers}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-25"
          onClick={() => setIsOpen(false)}
        />
      )}
      <CircleButton
        themeId="yellow"
        onClick={(e) => setIsOpen((is) => !is)}
        disabled={isCreating}
      >
        {isCreating ? <Spinner grow /> : <MdRecordVoiceOver />}
      </CircleButton>
      <div className="whitespace-no-wrap">
        <div className="h-20 w-20 inline-flex align-middle justify-center items-center"></div>
        <div
          className={classnames(
            'inline-block align-middle text-base text-black overflow-hidden min-w-0 duration-200',
            {
              'max-w-64': isOpen,
              'max-w-0': !isOpen,
            },
          )}
        >
          <div className="pr-6">
            <SpeakerSelect
              speakers={speakers}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const speaker = e.currentTarget.value;
                if (speaker) {
                  setIsOpen(false);
                  createMarks(buildSpeakerMarks(selections, speaker));
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMarkButton;
