import {johnDoe} from './users';
import {admin, author, moderator} from './roles';

const johnDoeAdmin = {
  id: '51a78c10-8abb-47a5-ba35-ca2bfb970fc9',
  userId: johnDoe.id,
  roleId: admin.id,
};

const johnDoeAuthor = {
  id: '76f27c8e-ffa6-4897-853c-37aaaa387a0e',
  userId: johnDoe.id,
  roleId: author.id,
};

const johnDoeModerator = {
  id: 'd00725a8-0ac9-4eb3-b2c2-4ed1d11032a1',
  userId: johnDoe.id,
  roleId: moderator.id,
};

export default [johnDoeAdmin, johnDoeAuthor, johnDoeModerator];
