import React, {FC, useState} from 'react';
import useAsync from '../utils/useAsync';
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
import {NewSpeaker} from '../utils/types';
import compareSpeakers from '../utils/compareSpeakers';

const SpeakerDialog: FC<{
  speaker: NewSpeaker;
  close: () => void;
  reloadSpeakers: () => void;
}> = ({speaker, close, reloadSpeakers}) => {
  const nameId = useId();
  const descId = useId();
  const [name, setName] = useState(speaker.name ?? '');
  const [description, setDescription] = useState(speaker.description ?? '');
  const [error, setError] = useState<Error | null>(null);

  const save = async () => {
    try {
      await mutations.createOrUpdateSpeaker({
        ...speaker,
        name: name || undefined,
        description: description || undefined,
      });
      reloadSpeakers();
      close();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Dialog title="Edit Speaker" close={close}>
      <FormGroup label="Name" labelFor={nameId}>
        <Input
          id={nameId}
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </FormGroup>
      <FormGroup label="Description" labelFor={descId}>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </FormGroup>

      {error && <ErrorAlert error={error} />}

      <Button onClick={save}>Save</Button>
    </Dialog>
  );
};

const getAllSpeakersWIthoutCache = () =>
  queries.getAllSpeakers({noCache: true});

const Speakers: FC = () => {
  const {result: speakers, error, reload} = useAsync(
    getAllSpeakersWIthoutCache,
  );
  const [editSpeaker, setEditSpeaker] = useState<{
    id?: string;
    name?: string;
    description?: string;
  } | null>(null);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!speakers) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      {editSpeaker && (
        <SpeakerDialog
          speaker={editSpeaker}
          close={() => setEditSpeaker(null)}
          reloadSpeakers={reload}
        />
      )}
      <div className="text-right">
        <Button onClick={() => setEditSpeaker({})}>Add Speaker</Button>
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
          {speakers.sort(compareSpeakers).map((speaker) => (
            <tr key={speaker.id}>
              <td>{speaker.id ?? <em>undefined</em>}</td>
              <td>{speaker.name ?? <em>undefined</em>}</td>
              <td>{speaker.description ?? <em>undefined</em>}</td>
              <td>
                <Button onClick={() => setEditSpeaker(speaker)}>
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

export default Speakers;
