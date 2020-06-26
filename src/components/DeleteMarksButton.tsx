import React, {FC} from 'react';
import {MdDelete} from 'react-icons/md';
import CircleButton from './CircleButton';
import Spinner from './Spinner';
import {Mark} from '../utils/types';

const DeleteMarksButton: FC<{
  marks: Array<Mark>;
  selectedMarkIds: string[];
  updateMarks: (marks: Array<Mark>) => void;
  isDeleting: boolean;
}> = ({selectedMarkIds, marks, updateMarks, isDeleting}) => (
  <CircleButton
    themeId="red"
    onClick={() =>
      updateMarks(
        marks
          .filter((m) => selectedMarkIds.includes(m.id))
          .map((m) => ({...m, isActive: false, lastUpdated: Date.now()})),
      )
    }
    disabled={isDeleting}
  >
    {isDeleting ? <Spinner grow /> : <MdDelete />}
  </CircleButton>
);

export default DeleteMarksButton;
