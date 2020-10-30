import React, {FC, useState} from 'react';
import {createPerson, updatePerson} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import {useId} from '@reach/auto-id';
import Dialog from '../widgets/Dialog';
import Input from '../widgets/Input';
import Textarea from '../widgets/Textarea';
import Button from '../widgets/Button';
import FormGroup from '../widgets/FormGroup';
import {PersonRecord, Unsaved} from '../types';
import {useQueryCache} from 'react-query';

const EditPersonDialog: FC<{
  person: PersonRecord | Unsaved<PersonRecord>;
  close: () => void;
}> = ({person, close}) => {
  const nameFieldId = useId();
  const orderFieldId = useId();
  const descriptionFieldId = useId();
  const [name, setName] = useState(person.name ?? null);
  const [order, setOrder] = useState(person.order ?? null);
  const [description, setDescriptiongrapy] = useState(
    person.description ?? null,
  );
  const queryCache = useQueryCache();

  const [error, setError] = useState<Error | null>(null);

  const save = async () => {
    try {
      // @ts-expect-error
      if (person.id) {
        await updatePerson({
          ...(person as PersonRecord),
          name: name || null,
          order: order || null,
          description,
        });
      } else {
        await createPerson({
          name: name || null,
          order: order || null,
          description,
        });
      }
      queryCache.invalidateQueries('people');
      close();
    } catch (err) {
      setError(err);
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

      <FormGroup label="Order" labelFor={orderFieldId}>
        <Input
          id={orderFieldId}
          type="number"
          min={1}
          step={1}
          value={order ?? ''}
          onChange={(e) => setOrder(e.currentTarget.valueAsNumber)}
        />
      </FormGroup>

      <FormGroup label="Description" labelFor={descriptionFieldId}>
        <Textarea
          id={descriptionFieldId}
          value={description ?? ''}
          onChange={(e) => setDescriptiongrapy(e.currentTarget.value)}
        />
      </FormGroup>

      {error && <ErrorAlert error={error} />}

      <Button onClick={save}>Save</Button>
    </Dialog>
  );
};

export default EditPersonDialog;
