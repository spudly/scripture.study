import React, { FC } from "react";
import classnames from "classnames";
import { theme, ThemeName } from "../data/themes";
import { Unstyled } from "../utils/types";

type Props = Unstyled<"button"> & {
  microtheme: string;
};

const CircleButton: FC<JSX.IntrinsicElements["button"] & {
  themeId: number | ThemeName;
}> = ({ themeId, ...props }) => (
  <button
    {...props}
    className={classnames(
      "inline-flex flex-shrink-0 text-4xl min-w-20 h-20 rounded-full uppercase items-center justify-center focus:outline-none focus:shadow-outline shadow-lg m-2 cursor-pointer flex-no-wrap leading-none select-none",
      theme(themeId)
    )}
  />
);

export default CircleButton;
