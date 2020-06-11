import React, {FC, ComponentProps} from 'react';
import Select from '../components/Select';
import {Person} from '../utils/types';
import useLocalStorage from '../utils/useLocalStorage';

const byName = (a: Person, b: Person) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();
  return aName < bName ? -1 : aName > bName ? 1 : 0;
};

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
  ComponentProps<typeof Select> & {speakers: Array<Person>}
> = ({speakers, onChange, ...rest}) => {
  const [recentSpeakerIds, setSpeakerIdUsed] = useRecentItems(
    'recentSpeakers',
    5,
  );
  const recentSpeakers = speakers.filter((s) =>
    recentSpeakerIds?.includes(s.id),
  );
  const renderSpeakerOption = ({id, name, description}: Person) => (
    <option key={id} value={id}>
      {description ? `${name}, ${description}` : name}
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
      {speakers.sort(byName).map(renderSpeakerOption)}
    </Select>
  );
};

export default SpeakerSelect;
