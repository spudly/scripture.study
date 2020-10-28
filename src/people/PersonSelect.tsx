import React, {FC, ComponentProps} from 'react';
import Select from '../widgets/Select';
import {PersonRecord} from '../types';
import {serializePerson} from '../utils/serializePerson';
import comparePeople from '../utils/comparePeople';
import {useQuery} from 'react-query';
import {getAllPeople} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import Spinner from '../widgets/Spinner';
import useRecentItems from '../utils/useRecentItems';

const PersonSelect: FC<ComponentProps<typeof Select>> = ({
  value,
  onChange,
  ...rest
}) => {
  const [recentPersonIds, setPersonIdUsed] = useRecentItems('recentPeople', 5);

  const {data: {items: people = undefined} = {}, error, isLoading} = useQuery(
    ['people'],
    getAllPeople,
  );

  if (isLoading) {
    return <Spinner grow />;
  }

  if (error || !people) {
    return <ErrorAlert error={error} />;
  }

  const recentPeople = people.filter((s) => recentPersonIds?.includes(s.id));
  const renderPersonOption = (person: PersonRecord) => (
    <option key={person.id} value={person.id}>
      {serializePerson(person)}
    </option>
  );
  return (
    <Select
      {...rest}
      value={value}
      onChange={(e) => {
        setPersonIdUsed(e.currentTarget.value);
        onChange?.(e);
      }}
    >
      <option />
      <optgroup label="Recent">{recentPeople.map(renderPersonOption)}</optgroup>
      {people.sort(comparePeople).map(renderPersonOption)}
    </Select>
  );
};

export default PersonSelect;
