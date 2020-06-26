import React, {useState, FC} from 'react';
import {Mark, Person} from '../utils/types';
import {MdEdit} from 'react-icons/md';
import classnames from 'classnames';
import CircleButton from './CircleButton';
import SpeakerSelect from './SpeakerSelect';
import Spinner from './Spinner';

const EditMarksButton: FC<{
  updateMarks: (marks: Array<Mark>) => void;
  isUpdating?: boolean;
  marks: Array<Mark>;
  speakers: Array<Person>;
  selectedMarkIds: string[];
}> = ({updateMarks, isUpdating, speakers, marks, selectedMarkIds}) => {
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
              <SpeakerSelect
                speakers={speakers}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const speakerId = e.currentTarget.value;
                  if (speakerId) {
                    setIsOpen(false);
                    updateMarks(
                      marks
                        .filter((m) => selectedMarkIds.includes(m.id))
                        .map((m) => ({
                          ...m,
                          speakerId,
                          lastUpdated: Date.now(),
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
