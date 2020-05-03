import React, {FC} from 'react';
import {MdDelete} from 'react-icons/md';
import CircleButton from './CircleButton';
import Spinner from './Spinner';

const DeleteMarksButton: FC<{
  selectedMarkIds: string[];
  deleteMarks: (ids: string[]) => void;
  isDeleting: boolean;
}> = ({selectedMarkIds, deleteMarks, isDeleting}) => (
  <CircleButton
    themeId="red"
    onClick={() => deleteMarks(selectedMarkIds)}
    disabled={isDeleting}
  >
    {isDeleting ? <Spinner grow /> : <MdDelete />}
  </CircleButton>
);

export default DeleteMarksButton;
