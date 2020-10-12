import React, {FC, useState} from 'react';
import {mutations} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import {useId} from '@reach/auto-id';
import Dialog from '../widgets/Dialog';
import Input from '../widgets/Input';
import Textarea from '../widgets/Textarea';
import Button from '../widgets/Button';
import FormGroup from '../widgets/FormGroup';
import {PersonRecord, Unsaved} from '../utils/types';
import {queryCache} from 'react-query';

const NewPersonDialog: FC<{
  person: PersonRecord | Unsaved<PersonRecord>;
  close: () => void;
}> = ({person, close}) => {
  const nameFieldId = useId();
  const bioFieldId = useId();
  const [name, setName] = useState(person.name ?? null);
  const [biography, setBiograpy] = useState(person.biography ?? null);

  const [error, setError] = useState<Error | null>(null);

  const save = async () => {
    try {
      if ('id' in person && person.id != null) {
        await mutations.updatePerson({
          ...person,
          name,
          biography,
        });
      } else {
        await mutations.createPerson({name, biography});
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

      {error && <ErrorAlert error={error} />}

      <Button onClick={save}>Save</Button>
    </Dialog>
  );
};

export default NewPersonDialog;
