import React, {FC} from 'react';
import {MarkRecord, PersonRecord, SpeakerMarkRecord} from '../utils/types';
import {MdEdit} from 'react-icons/md';
import PersonSelect from '../people/PersonSelect';
import Spinner from '../widgets/Spinner';
import Action from '../widgets/Action';

const EditMarksButton: FC<{
  updateMarks: (marks: Array<MarkRecord>) => void;
  isUpdating?: boolean;
  marks: Array<MarkRecord>;
  speakers: Array<PersonRecord>;
  selectedMarkIds: string[];
}> = ({updateMarks, isUpdating, speakers, marks, selectedMarkIds}) => (
  <Action
    disabled={isUpdating}
    themeId="yellow"
    icon={isUpdating ? <Spinner grow /> : <MdEdit />}
  >
    {({close}) => (
      <PersonSelect
        value=""
        onChange={(e) => {
          const personId = e.currentTarget.value;
          if (personId) {
            close();
            updateMarks(
              marks
                .filter((m) => selectedMarkIds.includes(m.id))
                .filter((m): m is SpeakerMarkRecord => m.type === 'speaker')
                .map((m) => ({
                  ...m,
                  speakerId: personId,
                })),
            );
          }
        }}
      />
    )}
  </Action>
);

export default EditMarksButton;
