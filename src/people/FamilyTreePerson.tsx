import React, {forwardRef} from 'react';
import {ID} from '../utils/types';
import {Link} from 'react-router-dom';
import usePerson from '../api/usePerson';
import classnames from 'classnames';

const FamilyTreePerson = forwardRef<
  HTMLDivElement,
  {id: ID; isActive?: boolean}
>(({id, isActive}, ref) => {
  const [person] = usePerson(id);
  return (
    <Link to={`/people/${id}`}>
      <div
        className={classnames(
          'border border-gray-400 shadow p-4 m-4 flex-initial',
          {
            'bg-gray-200 hover:bg-gray-300': !isActive,
            'bg-blue-200 hover:bg-blue-300': isActive,
          },
        )}
        ref={ref}
      >
        {person?.name ?? '?'}
      </div>
    </Link>
  );
});

export default FamilyTreePerson;
