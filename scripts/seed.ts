import '../src/utils/globals';
import {
  Book,
  Chapter,
  Mark,
  Person,
  PersonLink,
  Role,
  Session,
  User,
  UserRole,
  Verse,
  Volume,
} from '../src/api/api.postgres';
import users from '../src/fixtures/users';
import roles from '../src/fixtures/roles';
import userRoles from '../src/fixtures/userRoles';
import volumes from '../src/fixtures/volumes';
import books from '../src/fixtures/books';
import chapters from '../src/fixtures/chapters';
import verses from '../src/fixtures/verses';
import people from '../src/fixtures/people';
import marks from '../src/fixtures/marks';
import peopleLinks from '../src/fixtures/peopleLinks';

const seed = async () => {
  await User.sync({force: true});
  await User.bulkCreate(users);

  await Role.sync({force: true});
  await Role.bulkCreate(roles);

  await UserRole.sync({force: true});
  await UserRole.bulkCreate(userRoles);

  await Volume.sync({force: true});
  await Volume.bulkCreate(volumes);

  await Book.sync({force: true});
  await Book.bulkCreate(books);

  await Chapter.sync({force: true});
  await Chapter.bulkCreate(chapters);

  await Verse.sync({force: true});
  await Verse.bulkCreate(verses);

  await Person.sync({force: true});
  await Person.bulkCreate(people);

  await Mark.sync({force: true});
  await Mark.bulkCreate(marks);

  await Session.sync({force: true});

  await PersonLink.sync({force: true});
  await PersonLink.bulkCreate(peopleLinks);
};

seed().catch(error => {
  process.exitCode = 1;
  // eslint-disable-next-line no-console
  console.error(error);
});
