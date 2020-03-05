import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import CircleButton from "./CircleButton";
import Spinner from "./Spinner";

const DeleteMarkButton: FC<{
  selectedMarkId: string;
  deleteMark: (id: string) => void;
  isDeleting: boolean;
}> = ({ selectedMarkId, deleteMark, isDeleting }) => (
  <CircleButton
    themeId="red"
    onClick={() => deleteMark(selectedMarkId)}
    disabled={isDeleting}
  >
    {isDeleting ? <Spinner grow /> : <MdDelete />}
  </CircleButton>
);

export default DeleteMarkButton;
