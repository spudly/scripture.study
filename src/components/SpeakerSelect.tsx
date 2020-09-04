import React, {FC, ComponentProps} from 'react';
import Select from '../components/Select';
import {Speaker} from '../utils/types';
import useLocalStorage from '../utils/pushpop/useLocalStorage';
import serializeSpeaker from '../utils/serializeSpeaker';
import compareSpeakers from '../utils/compareSpeakers';

const useRecentItems = (key: string, max: number) => {
  const [items, setItems] = useLocalStorage<Array<string>>(key, []);

  const setUsed = (item: string) => {
    setItems((list) =>
      [item, ...(list ?? []).filter((i) => i !== item)].slice(0, max),
    );
  };

  return [items, setUsed] as const;
};

const SpeakerSelect: FC<
  ComponentProps<typeof Select> & {speakers: Array<Speaker>}
> = ({speakers, onChange, ...rest}) => {
  const [recentSpeakerIds, setSpeakerIdUsed] = useRecentItems(
    'recentSpeakers',
    5,
  );
  const recentSpeakers = speakers.filter((s) =>
    recentSpeakerIds?.includes(s.id),
  );
  const renderSpeakerOption = (speaker: Speaker) => (
    <option key={speaker.id} value={speaker.id}>
      {serializeSpeaker(speaker)}
    </option>
  );
  return (
    <Select
      {...rest}
      onChange={(e) => {
        setSpeakerIdUsed(e.currentTarget.value);
        onChange?.(e);
      }}
    >
      <option />
      <optgroup label="Recent">
        {recentSpeakers.map(renderSpeakerOption)}
      </optgroup>
      {speakers.sort(compareSpeakers).map(renderSpeakerOption)}
    </Select>
  );
};

export default SpeakerSelect;
