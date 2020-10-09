import React, {FC, useState} from 'react';
import {queries, mutations} from '../api/api.client';
import Spinner from '../widgets/Spinner';
import ErrorAlert from '../widgets/ErrorAlert';
import {MdEdit} from 'react-icons/md';
import {useId} from '@reach/auto-id';
import Table from '../widgets/Table';
import Dialog from '../widgets/Dialog';
import Input from '../widgets/Input';
import Textarea from '../widgets/Textarea';
import Button from '../widgets/Button';
import FormGroup from '../widgets/FormGroup';
import {PersonRecord, Unsaved} from '../utils/types';
import comparePeople from '../utils/comparePeople';
import {queryCache, useQuery} from 'react-query';
import PersonSelect from './PersonSelect';

const PersonDialog: FC<{
  person: PersonRecord | Unsaved<PersonRecord>;
  close: () => void;
}> = ({person, close}) => {
  const nameFieldId = useId();
  const bioFieldId = useId();
  const fatherFieldId = useId();
  const motherFieldId = useId();
  const [name, setName] = useState(person.name ?? null);
  const [biography, setBiograpy] = useState(person.biography ?? null);
  const [fatherId, setFatherId] = useState(person.fatherId ?? null);
  const [motherId, setMotherId] = useState(person.motherId ?? null);

  const [error, setError] = useState<Error | null>(null);

  const save = async () => {
    try {
      if ('id' in person && person.id != null) {
        await mutations.updatePerson({
          ...person,
          name,
          biography,
          fatherId,
          motherId,
        });
      } else {
        await mutations.createPerson({name, biography, fatherId, motherId});
      }
      queryCache.invalidateQueries('people');
      close();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog title="Edit Person" close={close}>
      <FormGroup label="Name" labelFor={nameFieldId}>
        <Input
          id={nameFieldId}
          type="text"
          value={name ?? ''}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </FormGroup>

      <FormGroup label="Description" labelFor={bioFieldId}>
        <Textarea
          id={bioFieldId}
          value={biography ?? ''}
          onChange={(e) => setBiograpy(e.currentTarget.value)}
        />
      </FormGroup>

      <FormGroup label="Father" labelFor={fatherFieldId}>
        <PersonSelect
          id={fatherFieldId}
          value={fatherId ?? ''}
          onChange={(e) => setFatherId(e.currentTarget.value)}
        />
      </FormGroup>

      <FormGroup label="Mother" labelFor={motherFieldId}>
        <PersonSelect
          id={motherFieldId}
          value={motherId ?? ''}
          onChange={(e) => setMotherId(e.currentTarget.value)}
        />
      </FormGroup>

      {error && <ErrorAlert error={error} />}

      <Button onClick={save}>Save</Button>
    </Dialog>
  );
};

const People: FC = () => {
  const {data: people, error} = useQuery('people', queries.getAllPeople);
  const [editPerson, setEditPerson] = useState<
    PersonRecord | Unsaved<PersonRecord> | null
  >(null);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!people) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      {editPerson && (
        <PersonDialog person={editPerson} close={() => setEditPerson(null)} />
      )}
      <div className="text-right">
        <Button
          onClick={() =>
            setEditPerson({
              name: null,
              biography: null,
              fatherId: null,
              motherId: null,
            })
          }
        >
          Add Person
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {people.sort(comparePeople).map((person) => (
            <tr key={person.id}>
              <td>{person.id ?? <em>None</em>}</td>
              <td>{person.name ?? <em>None</em>}</td>
              <td>{person.biography ?? <em>None</em>}</td>
              <td>
                <Button onClick={() => setEditPerson(person)}>
                  <MdEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default People;
