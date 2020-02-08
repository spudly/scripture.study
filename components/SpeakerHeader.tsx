import React, { FC } from "react";
import classnames from "classnames";

type Speaker = {}; // TODO

const SpeakerHeader: FC<{ speaker?: Speaker; speakerIndex?: number }> = ({
  speaker,
  speakerIndex
}) => (
  <div className={classnames("flex-shrink-0 h-24 w-full border")}>
    speaker header
  </div>
);

export default SpeakerHeader;
