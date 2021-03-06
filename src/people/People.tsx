import React, {FC, useContext, useState} from 'react';
import {MdAdd, MdEdit, MdCallMerge} from '@meronex/icons/md';
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {getAllPeople} from '../api/api.client';
import Spinner from '../widgets/Spinner';
import ErrorAlert from '../widgets/ErrorAlert';
import Table from '../widgets/Table';
import Button from '../widgets/Button';
import {PersonRecord, Unsaved} from '../types';
import comparePeople from '../utils/comparePeople';
import AnchorLink from '../widgets/AnchorLink';
import CircleButton from '../widgets/CircleButton';
import hasRole from '../utils/hasRole';
import UserContext from '../utils/UserContext';
import {serializePersonJsx} from '../utils/serializePerson';
import getCircas from '../utils/getCircas';
import EditPersonDialog from './EditPersonDialog';
import MergePersonDialog from './MergePersonDialog';

const People: FC = () => {
  const user = useContext(UserContext);
  const {data: {items: people = undefined} = {}, error} = useQuery(
    'people',
    getAllPeople,
  );
  const [editPerson, setEditPerson] = useState<
    PersonRecord | Unsaved<PersonRecord> | null
  >(null);
  const [mergePerson, setMergePerson] = useState<PersonRecord | null>(null);

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!people) {
    return <Spinner />;
  }

  return (
    <>
      <div className="p-4">
        <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
          <CircleButton
            themeId="blue"
            onClick={() =>
              setEditPerson({
                description: null,
                name: null,
                order: null,
                circaBirth: null,
                circa: null,
                circaDeath: null,
              })
            }
          >
            <MdAdd />
          </CircleButton>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Circa</th>
              <th>Description</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {people.sort(comparePeople).map(person => {
              const {birth, death} = getCircas(person);
              return (
                <tr key={person.id}>
                  <td>
                    <Link to={`/people/${person.id}`} component={AnchorLink}>
                      {person.name ? (
                        serializePersonJsx(person, {includeDescription: false})
                      ) : (
                        <em>Unnamed</em>
                      )}
                    </Link>
                  </td>
                  <td>
                    {birth != null && Math.abs(birth)}
                    {birth && death && ' - '}
                    {death != null && Math.abs(death)}{' '}
                    {(birth || death) &&
                      ((death || birth)! < 0 ? 'B.C.' : 'A.D.')}
                  </td>
                  <td>{person.description ?? <em>No Description</em>}</td>
                  <td>
                    {hasRole('author', user) && (
                      <Button onClick={() => setEditPerson(person)}>
                        <MdEdit />
                      </Button>
                    )}
                    {hasRole('author', user) && (
                      <Button onClick={() => setMergePerson(person)}>
                        <MdCallMerge />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {editPerson && hasRole('author', user) && (
        <EditPersonDialog
          person={editPerson}
          close={() => setEditPerson(null)}
        />
      )}
      {mergePerson && hasRole('author', user) && (
        <MergePersonDialog
          person={mergePerson}
          close={() => setMergePerson(null)}
        />
      )}
    </>
  );
};

export default People;
