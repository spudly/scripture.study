import React, { FC } from "react";
import { MdDelete } from "react-icons/md";
import CircleButton from "./CircleButton";

const DeleteMarkButton: FC<{
  selectedMarkId: string;
  deleteMark: (id: string) => void;
}> = ({ selectedMarkId, deleteMark }) => (
  <CircleButton themeId="red" onClick={() => deleteMark(selectedMarkId)}>
    <MdDelete />
  </CircleButton>
);

export default DeleteMarkButton;
