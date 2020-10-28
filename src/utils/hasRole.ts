import {RoleName, UserWithRoles} from '../types';

const hasRole = (role: RoleName, user: UserWithRoles | undefined | null) =>
  user &&
  (user.roles.includes(role) ||
    /* all users are authors: */
    role === 'author' ||
    /* admins can do all the things: */
    user.roles.includes('admin'));

export default hasRole;
