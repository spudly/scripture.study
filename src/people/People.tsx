import React, {FC, useContext, useState} from 'react';
import {getAllPeople} from '../api/api.client';
import Spinner from '../widgets/Spinner';
import ErrorAlert from '../widgets/ErrorAlert';
import {MdAdd, MdEdit} from 'react-icons/md';
import Table from '../widgets/Table';
import Button from '../widgets/Button';
import {PersonRecord, Unsaved} from '../utils/types';
import comparePeople from '../utils/comparePeople';
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import AnchorLink from '../widgets/AnchorLink';
import EditPersonDialog from './EditPersonDialog';
import CircleButton from '../widgets/CircleButton';
import hasRole from '../utils/hasRole';
import UserContext from '../utils/UserContext';
import {serializePerson, serializePersonJsx} from '../utils/serializePerson';

const People: FC = () => {
  const user = useContext(UserContext);
  const {data: {items: people = undefined} = {}, error} = useQuery(
    'people',
    getAllPeople,
  );
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
    <>
      <div className="p-4">
        <div className="fixed bottom-0 right-0 pr-4 pb-4 text-right">
          <CircleButton
            themeId="blue"
            onClick={() =>
              setEditPerson({
                name: null,
                description: null,
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
              <th>Description</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {people.sort(comparePeople).map((person) => (
              <tr key={person.id}>
                <td>
                  <Link to={`/people/${person.id}`} component={AnchorLink}>
                    {person.name ? (
                      serializePersonJsx(person, false)
                    ) : (
                      <em>Unnamed</em>
                    )}
                  </Link>
                </td>
                <td>{person.description ?? <em>No Description</em>}</td>
                <td>
                  {hasRole('author', user) && (
                    <Button onClick={() => setEditPerson(person)}>
                      <MdEdit />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {editPerson && hasRole('author', user) && (
        <EditPersonDialog
          person={editPerson}
          close={() => setEditPerson(null)}
        />
      )}
    </>
  );
};

export default People;
