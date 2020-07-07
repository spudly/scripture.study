import React, {FC, useState, useEffect} from 'react';
import UserContext from '../utils/UserContext';
import {User} from '../utils/types';
import CircleButton from './CircleButton';
import {FiLogOut} from 'react-icons/fi';

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
  return (
    <UserContext.Provider value={user}>
      {children}
      <div className="fixed top-0 right-0 pr-4 pt-4">
        <CircleButton
          themeId="purple"
          style={{
            backgroundImage: user?.picture ? `url(${user?.picture})` : '',
            backgroundSize: '100%',
          }}
        >
          {user ? null : ( // <a className="text-base font-bold" href="/auth/logout"></a>
            <a className="text-base font-bold" href="/auth/login">
              Login
            </a>
          )}
        </CircleButton>
      </div>
    </UserContext.Provider>
  );
};

export default Authorize;
