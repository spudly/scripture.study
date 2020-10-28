import React, {FC} from 'react';
import {MdDelete} from 'react-icons/md';
import CircleButton from '../widgets/CircleButton';
import Spinner from '../widgets/Spinner';
import {ID, MarkRecord} from '../types';

const DeleteMarksButton: FC<{
  marks: Array<MarkRecord>;
  selectedMarkIds: string[];
  deleteMarks: (ids: Array<ID>) => void;
  isDeleting: boolean;
}> = ({selectedMarkIds, marks, deleteMarks, isDeleting}) => (
  <CircleButton
    themeId="red"
    onClick={() =>
      deleteMarks(
        marks.filter((m) => selectedMarkIds.includes(m.id)).map((m) => m.id),
      )
    }
    disabled={isDeleting}
  >
    {isDeleting ? <Spinner grow /> : <MdDelete />}
  </CircleButton>
);

export default DeleteMarksButton;
