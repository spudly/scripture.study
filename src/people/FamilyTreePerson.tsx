import React, {Dispatch, SetStateAction, forwardRef, useContext} from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {MdDelete, MdEdit} from 'react-icons/md';
import {useMutation} from 'react-query';
import {ID, PersonLinkRecord} from '../types';
import usePerson from '../api/usePerson';
import {serializePerson, serializePersonJsx} from '../utils/serializePerson';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import queryClient from '../utils/queryClient';
import {deletePersonLink} from '../api/api.client';
import IconButton from '../widgets/IconButton';

const FamilyTreePerson = forwardRef<
  HTMLDivElement,
  {
    id: ID;
    isActive?: boolean;
    link?: PersonLinkRecord;
    setEditLink: Dispatch<SetStateAction<PersonLinkRecord | null>>;
  }
>(({id, isActive, link, setEditLink}, ref) => {
  const user = useContext(UserContext);
  const [person] = usePerson(id);

  const {mutate: deleteLink} = useMutation(deletePersonLink, {
    onSuccess: () => {
      void queryClient.invalidateQueries('people_links');
    },
  });

  return (
    <div className="group flex m-4">
      <Link to={`/people/${id}`}>
        <div
          className={classnames('border border-gray-400 p-4 shadow', {
            'bg-blue-200 hover:bg-blue-300': isActive,
            'bg-gray-200 hover:bg-gray-300': !isActive,
          })}
          title={person ? serializePerson(person) : undefined}
          ref={ref}
        >
          {person && serializePersonJsx(person, {includeDescription: false})}
        </div>
      </Link>
      {link && person && hasRole('author', user) && (
        <div className="invisible group-hover:visible flex flex-col">
          <IconButton
            title={`Edit Link to ${serializePerson(person)}`}
            icon={<MdEdit />}
            onClick={() => setEditLink(link)}
          />
          <IconButton
            title={`Delete Link to ${serializePerson(person)}`}
            icon={<MdDelete />}
            onClick={() => {
              deleteLink({id: link.id});
            }}
          />
        </div>
      )}
    </div>
  );
});

export default FamilyTreePerson;
