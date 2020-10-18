import React, {FC, useState} from 'react';
import {createPerson, updatePerson} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import {useId} from '@reach/auto-id';
import Dialog from '../widgets/Dialog';
import Input from '../widgets/Input';
import Textarea from '../widgets/Textarea';
import Button from '../widgets/Button';
import FormGroup from '../widgets/FormGroup';
import {PersonRecord, Unsaved} from '../utils/types';
import {useQueryCache} from 'react-query';

const EditPersonDialog: FC<{
  person: PersonRecord | Unsaved<PersonRecord>;
  close: () => void;
}> = ({person, close}) => {
  const nameFieldId = useId();
  const bioFieldId = useId();
  const [name, setName] = useState(person.name ?? null);
  const [biography, setBiograpy] = useState(person.biography ?? null);
  const queryCache = useQueryCache();

  const [error, setError] = useState<Error | null>(null);

  const save = async () => {
    try {
      // @ts-expect-error
      if (person.id) {
        await updatePerson({
          ...(person as PersonRecord),
          name: name || null,
          biography,
        });
      } else {
        await createPerson({name: name || null, biography});
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

export default EditPersonDialog;
