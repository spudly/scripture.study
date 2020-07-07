import {User} from './types';

const hasRole = (user: User | null | undefined, role: string) =>
  user?.roles?.includes(role) || user?.roles?.includes('admin');

export default hasRole;
