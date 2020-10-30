import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  forwardRef,
  useContext,
} from 'react';
import {ID, PersonLinkRecord, Unstyled} from '../types';
import {Link} from 'react-router-dom';
import usePerson from '../api/usePerson';
import classnames from 'classnames';
import {MdDelete, MdEdit} from 'react-icons/md';
import {serializePerson, serializePersonJsx} from '../utils/serializePerson';
import UserContext from '../utils/UserContext';
import hasRole from '../utils/hasRole';
import {useMutation} from 'react-query';
import queryCache from '../utils/queryCache';
import {deletePersonLink} from '../api/api.client';

const IconButton: FC<Unstyled<'button'> & {icon: ReactNode; title: string}> = ({
  icon,
  ...buttonProps
}) => (
  <button
    {...buttonProps}
    className="transform p-1 hover:scale-110 hover:border hover:border-gray-500 hover:bg-gray-400 rounded text-gray-500 hover:text-gray-800"
  >
    {icon}
  </button>
);

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

  const [deleteLink] = useMutation(deletePersonLink, {
    onSuccess: () => {
      void queryCache.invalidateQueries('people_links');
    },
  });

  return (
    <div className="group flex m-4">
      <Link to={`/people/${id}`}>
        <div
          className={classnames('border border-gray-400 p-4 shadow', {
            'bg-gray-200 hover:bg-gray-300': !isActive,
            'bg-blue-200 hover:bg-blue-300': isActive,
          })}
          title={person ? serializePerson(person) : undefined}
          ref={ref}
        >
          {person && serializePersonJsx(person, false)}
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
