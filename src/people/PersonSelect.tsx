import React, {FC, ComponentProps} from 'react';
import Select from '../widgets/Select';
import {PersonRecord} from '../utils/types';
import serializePerson from '../utils/serializePerson';
import comparePeople from '../utils/comparePeople';
import {useQuery} from 'react-query';
import {queries} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import Spinner from '../widgets/Spinner';
import useRecentItems from '../utils/useRecentItems';

const PersonSelect: FC<ComponentProps<typeof Select>> = ({
  value,
  onChange,
  ...rest
}) => {
  const [recentPersonIds, setPersonIdUsed] = useRecentItems('recentPeople', 5);

  const {data: people, error, isLoading} = useQuery(
    ['people'],
    queries.getAllPeople,
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