import React, {useState, FC} from 'react';
import {Mark, Person, Resource} from '../utils/types';
import {MdEdit} from 'react-icons/md';
import classnames from 'classnames';
import CircleButton from './CircleButton';
import Select from './Select';
import Spinner from './Spinner';

const byName = (a: Person, b: Person) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();
  return aName < bName ? -1 : aName > bName ? 1 : 0;
};

const EditMarksButton: FC<{
  updateMarks: (marks: Array<Pick<Mark, 'id' | 'speakerId'>>) => void;
  isUpdating?: boolean;
  marksResource: Resource<Array<Mark>>;
  speakersResource: Resource<Array<Person>>;
}> = ({updateMarks, isUpdating, speakersResource, marksResource}) => {
  const [isOpen, setIsOpen] = useState(false);
  const speakers = speakersResource.read();
  const marks = marksResource.read();

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
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const speakerId = e.currentTarget.value;
                  if (speakerId) {
                    setIsOpen(false);
                    updateMarks(marks.map((m) => ({id: m.id, speakerId})));
                  }
                }}
              >
                <option />
                {speakers.sort(byName).map(({id, name, description}) => (
                  <option key={id} value={id}>
                    {name}
                    {description && <>, {description}</>}
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

export default EditMarksButton;
