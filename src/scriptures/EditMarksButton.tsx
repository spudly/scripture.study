import React, {useState, FC} from 'react';
import {MarkRecord, PersonRecord, SpeakerMarkRecord} from '../utils/types';
import {MdEdit} from 'react-icons/md';
import classnames from 'classnames';
import CircleButton from '../widgets/CircleButton';
import PersonSelect from '../people/PersonSelect';
import Spinner from '../widgets/Spinner';
import Overlay from '../widgets/Overlay';

const EditMarksButton: FC<{
  updateMarks: (marks: Array<MarkRecord>) => void;
  isUpdating?: boolean;
  marks: Array<MarkRecord>;
  speakers: Array<PersonRecord>;
  selectedMarkIds: string[];
}> = ({updateMarks, isUpdating, speakers, marks, selectedMarkIds}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
      <CircleButton
        themeId="blue"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((is) => !is);
        }}
        disabled={isUpdating}
      >
        <div className="whitespace-no-wrap">
          <div className="h-20 w-20 inline-flex align-middle justify-center items-center">
            {isUpdating ? <Spinner grow /> : <MdEdit />}
          </div>
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
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const personId = e.currentTarget.value;
                  if (personId) {
                    setIsOpen(false);
                    updateMarks(
                      marks
                        .filter((m) => selectedMarkIds.includes(m.id))
                        .filter(
                          (m): m is SpeakerMarkRecord => m.type === 'speaker',
                        )
                        .map((m) => ({
                          ...m,
                          speakerId: personId,
                        })),
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>
      </CircleButton>
    </>
  );
};

export default EditMarksButton;
