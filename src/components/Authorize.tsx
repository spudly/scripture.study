import React, {FC, useState, useEffect} from 'react';
import UserContext from '../utils/UserContext';
import {User} from '../utils/types';

const Authorize: FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
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