import React, {FC, useState} from 'react';
import {useId} from '@reach/auto-id';
import {useMutation, useQueryClient} from 'react-query';
import {mergePeople} from '../api/api.client';
import ErrorAlert from '../widgets/ErrorAlert';
import Dialog from '../widgets/Dialog';
import Button from '../widgets/Button';
import FormGroup from '../widgets/FormGroup';
import {ID, PersonRecord} from '../types';
import PersonSelect from './PersonSelect';

const MergePersonDialog: FC<{
  person: PersonRecord;
  close: () => void;
}> = ({person: person1, close}) => {
  const personFieldId = useId();
  const otherFieldId = useId();
  const [otherPersonId, setOtherPersonId] = useState<ID | null>(null);

  const queryClient = useQueryClient();
  const {mutate: merge, error} = useMutation(mergePeople, {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries('people'),
        queryClient.invalidateQueries('marks'),
        queryClient.invalidateQueries('people_links'),
      ]);
      close();
    },
  });

  return (
    <Dialog title="Merge People" close={close}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <FormGroup label="Person 1" labelFor={personFieldId}>
        <PersonSelect id={personFieldId} value={person1.id} disabled />
      </FormGroup>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <FormGroup label="Person 2" labelFor={otherFieldId}>
        <PersonSelect
          id={otherFieldId}
          value={otherPersonId ?? ''}
          onChange={e => setOtherPersonId(e.currentTarget.value)}
        />
      </FormGroup>

      {error && <ErrorAlert error={error} />}

      <Button
        onClick={
          otherPersonId
            ? () => merge({ids: [person1.id, otherPersonId]})
            : undefined
        }
        disabled={!otherPersonId}
      >
        Save
      </Button>
    </Dialog>
  );
};

export default MergePersonDialog;
