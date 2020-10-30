import React, {FC, useEffect, useState} from 'react';
import UserContext from '../utils/UserContext';
import {UserWithRoles} from '../types';

const Authorize: FC = ({children}) => {
  const [user, setUser] = useState<UserWithRoles | null>(null);
  useEffect(() => {
    const effect = async () => {
      const response = await fetch('/auth/user');
      if (response.ok) {
        setUser(await response.json());
      }
    };
    effect();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default Authorize;
