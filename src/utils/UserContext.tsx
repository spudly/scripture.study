import {createContext} from 'react';
import {UserWithRoles} from '../types';

const UserContext = createContext<UserWithRoles | null>(null);

export default UserContext;
