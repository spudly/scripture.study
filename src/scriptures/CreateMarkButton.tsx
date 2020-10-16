import React, {useState, FC} from 'react';
import {ID, MarkRecord, PersonRecord, Unsaved} from '../utils/types';
import {MdRecordVoiceOver} from 'react-icons/md';
import classnames from 'classnames';
import CircleButton from '../widgets/CircleButton';
import {VerseSelection} from '../utils/types';
import Spinner from '../widgets/Spinner';
import PersonSelect from '../people/PersonSelect';
import Overlay from '../widgets/Overlay';

const buildSpeakerMarks = (
  selections: Array<VerseSelection>,
  speakerId: ID,
): Array<Unsaved<MarkRecord>> =>
  selections.map((selection) => ({
    ...selection,
    type: 'speaker',
    isActive: true,
    lastUpdated: Date.now(),
    speakerId,
    personId: null,
    placeId: null,
    thingId: null,
    eventId: null,
  }));

const CreateMarkButton: FC<{
  selections: Array<VerseSelection>;
  createMarks: (marks: Array<Unsaved<MarkRecord>>) => void;
  isCreating?: boolean;
  speakers: Array<PersonRecord>;
}> = ({selections, createMarks, isCreating, speakers}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
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
            <PersonSelect
              value=""
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
