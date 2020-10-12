import {useId} from '@reach/auto-id';
import React, {FC, useState} from 'react';
import {useMutation, useQueryCache} from 'react-query';
import {mutations} from '../api/api.client';
import {
  Audited,
  ID,
  PersonLinkRecord,
  PersonRecord,
  Unsaved,
} from '../utils/types';
import Button from '../widgets/Button';
import Dialog from '../widgets/Dialog';
import FormGroup from '../widgets/FormGroup';
import Select from '../widgets/Select';
import PersonSelect from './PersonSelect';

const createOrUpdatePersonLink = async ({
  self,
  link,
  type,
  otherPersonId,
  reverse,
}: {
  self: Audited<PersonRecord>;
  link?: Audited<PersonLinkRecord>;
  type: PersonLinkRecord['type'];
  otherPersonId: ID;
  reverse: boolean;
}) => {
  const values: Unsaved<PersonLinkRecord> = reverse
    ? {
        fromPersonId: otherPersonId,
        type,
        toPersonId: self.id,
      }
    : {
        fromPersonId: self.id,
        type,
        toPersonId: otherPersonId,
      };
  if (link) {
    await mutations.updatePersonLink({
      ...link,
      ...values,
    });
  } else {
    await mutations.createPersonLink(values);
  }
};

const PersonLinkDialog: FC<{
  self: Audited<PersonRecord>;
  link?: Audited<PersonLinkRecord>;
  close: () => void;
}> = ({self, link, close}) => {
  const [type, setType] = useState<PersonLinkRecord['type'] | null>(null);
  const [otherPersonId, setOtherPersonId] = useState<ID | null>(null);
  const [reverse, setReverse] = useState(false);
  const typeFieldId = useId();
  const otherPersonFieldId = useId();
  const queryCache = useQueryCache();

  const [save] = useMutation(createOrUpdatePersonLink, {
    onSuccess: () => {
      void queryCache.invalidateQueries('people_links');
      close();
    },
  });

  return (
    <Dialog title="Link Person" close={close}>
      <FormGroup label="Relationship" labelFor={typeFieldId}>
        <Select
          id={typeFieldId}
          value={type ?? ''}
          onChange={(e) => {
            const {value} = e.currentTarget;
            setType(
              (value?.replace(/^reverse:/, '') || null) as
                | PersonLinkRecord['type']
                | null,
            );
            setReverse(/^reverse:/.test(value));
          }}
        >
          <option></option>
          <option value="spouseOf">Spouse</option>
          <option value="childOf">Parent</option>
          <option value="reverse:childOf">Child</option>
        </Select>
      </FormGroup>
      <FormGroup label="Other Person" labelFor={otherPersonFieldId}>
        <PersonSelect
          id={otherPersonFieldId}
          value={otherPersonId ?? ''}
          onChange={(e) => setOtherPersonId(e.currentTarget.value || null)}
        />
      </FormGroup>
      <Button
        disabled={!type || !otherPersonId}
        onClick={() =>
          save({
            self,
            link,
            type: type!,
            otherPersonId: otherPersonId!,
            reverse,
          })
        }
      >
        Save
      </Button>
    </Dialog>
  );
};

export default PersonLinkDialog;
