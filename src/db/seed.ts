import {
  User,
  Role,
  UserRole,
  Volume,
  Book,
  Chapter,
  Verse,
  Person,
  Place,
  List,
  ListItem,
  Thing,
  Event,
  Mark,
  Question,
  Answer,
  Session,
  PersonLink,
} from '../api/api.postgres';
import users from '../fixtures/users';
import roles from '../fixtures/roles';
import userRoles from '../fixtures/userRoles';
import volumes from '../fixtures/volumes';
import books from '../fixtures/books';
import chapters from '../fixtures/chapters';
import verses from '../fixtures/verses';
import people from '../fixtures/people';
import marks from '../fixtures/marks';
import peopleLinks from '../fixtures/peopleLinks';

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

  await Place.sync({force: true});

  await List.sync({force: true});

  await ListItem.sync({force: true});

  await Thing.sync({force: true});

  await Event.sync({force: true});

  await Mark.sync({force: true});
  await Mark.bulkCreate(marks);

  await Question.sync({force: true});

  await Answer.sync({force: true});

  await Session.sync({force: true});

  await PersonLink.sync({force: true});
  await PersonLink.bulkCreate(peopleLinks);
};

seed().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
