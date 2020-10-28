import React, {FC} from 'react';
import {ID, MarkRecord, PersonRecord, Unsaved} from '../types';
import {MdRecordVoiceOver} from 'react-icons/md';
import {VerseSelection} from '../types';
import Spinner from '../widgets/Spinner';
import PersonSelect from '../people/PersonSelect';
import Action from '../widgets/Action';

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
}> = ({selections, createMarks, isCreating, speakers}) => (
  <Action
    disabled={isCreating}
    themeId="yellow"
    icon={isCreating ? <Spinner grow /> : <MdRecordVoiceOver />}
  >
    {({close}) => (
      <PersonSelect
        value=""
        onChange={(e) => {
          const speaker = e.currentTarget.value;
          if (speaker) {
            close();
            createMarks(buildSpeakerMarks(selections, speaker));
          }
        }}
      />
    )}
  </Action>
);

export default CreateMarkButton;
