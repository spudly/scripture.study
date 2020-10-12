import React, {FC, useState} from 'react';
import {queries} from '../api/api.client';
import Spinner from '../widgets/Spinner';
import ErrorAlert from '../widgets/ErrorAlert';
import {MdEdit} from 'react-icons/md';
import Table from '../widgets/Table';
import Button from '../widgets/Button';
import {PersonRecord, Unsaved} from '../utils/types';
import comparePeople from '../utils/comparePeople';
import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import AnchorLink from '../widgets/AnchorLink';
import NewPersonDialog from './NewPersonDialog';

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
        <NewPersonDialog
          person={editPerson}
          close={() => setEditPerson(null)}
        />
      )}
      <div className="text-right">
        <Button
          onClick={() =>
            setEditPerson({
              name: null,
              biography: null,
            })
          }
        >
          Add Person
        </Button>
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
                  {person.name ?? <em>None</em>}
                  <br />
                  <small className="text-gray-500 whitespace-no-wrap">
                    {person.id}
                  </small>
                </Link>
              </td>
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
