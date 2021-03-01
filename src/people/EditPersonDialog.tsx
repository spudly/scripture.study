import React, {FC, useState} from 'react';
import {useId} from '@reach/auto-id';
import {useQueryClient} from 'react-query';
import {createPerson, updatePerson} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import Dialog from '../widgets/Dialog';
import Input from '../widgets/Input';
import Textarea from '../widgets/Textarea';
import Button from '../widgets/Button';
import FormGroup from '../widgets/FormGroup';
import {PersonRecord, Unsaved} from '../types';

const EditPersonDialog: FC<{
  person: PersonRecord | Unsaved<PersonRecord>;
  close: () => void;
}> = ({person, close}) => {
  const nameFieldId = useId();
  const orderFieldId = useId();
  const circaBirthFieldId = useId();
  const circaFieldId = useId();
  const circaDeathFieldId = useId();
  const descriptionFieldId = useId();
  const [name, setName] = useState(person.name ?? null);
  const [order, setOrder] = useState(person.order ?? null);
  const [circaBirth, setCircaBirth] = useState(person.circaBirth ?? null);
  const [circa, setCirca] = useState(person.circa ?? null);
  const [circaDeath, setCircaDeath] = useState(person.circaDeath ?? null);
  const [description, setDescriptiongrapy] = useState(
    person.description ?? null,
  );
  const queryClient = useQueryClient();

  const [error, setError] = useState<Error | null>(null);

  const save = async () => {
    try {
      // @ts-expect-error
      if (person.id) {
        await updatePerson({
          ...(person as PersonRecord),
          description,
          name: name || null,
          order: order || null,
          circaBirth: circaBirth || null,
          circa: circa || null,
          circaDeath: circaDeath || null,
        });
      } else {
        await createPerson({
          description,
          name: name || null,
          order: order || null,
          circaBirth: circaBirth || null,
          circa: circa || null,
          circaDeath: circaDeath || null,
        });
      }
      queryClient.invalidateQueries('people');
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
          onChange={e => setName(e.currentTarget.value)}
        />
      </FormGroup>

      <FormGroup label="Order" labelFor={orderFieldId}>
        <Input
          id={orderFieldId}
          type="number"
          min={1}
          step={1}
          value={order ?? ''}
          onChange={e => setOrder(e.currentTarget.valueAsNumber)}
        />
      </FormGroup>

      <FormGroup label="Estimated Birth Year" labelFor={circaBirthFieldId}>
        <Input
          id={circaBirthFieldId}
          type="number"
          min={1}
          step={1}
          value={circaBirth ?? ''}
          onChange={e => setCircaBirth(e.currentTarget.valueAsNumber)}
        />
      </FormGroup>

      <FormGroup label="Estimated Existence Year" labelFor={circaFieldId}>
        <Input
          id={circaFieldId}
          type="number"
          min={1}
          step={1}
          value={circa ?? ''}
          onChange={e => setCirca(e.currentTarget.valueAsNumber)}
        />
      </FormGroup>

      <FormGroup label="Estimated Death Year" labelFor={circaDeathFieldId}>
        <Input
          id={circaDeathFieldId}
          type="number"
          min={1}
          step={1}
          value={circaDeath ?? ''}
          onChange={e => setCircaDeath(e.currentTarget.valueAsNumber)}
        />
      </FormGroup>

      <FormGroup label="Description" labelFor={descriptionFieldId}>
        <Textarea
          id={descriptionFieldId}
          value={description ?? ''}
          onChange={e => setDescriptiongrapy(e.currentTarget.value)}
        />
      </FormGroup>

      {error && <ErrorAlert error={error} />}

      <Button onClick={save}>Save</Button>
    </Dialog>
  );
};

export default EditPersonDialog;
