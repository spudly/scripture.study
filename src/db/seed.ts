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
  await User.sync();
  await User.bulkCreate(users);

  await Role.sync();
  await Role.bulkCreate(roles);

  await UserRole.sync();
  await UserRole.bulkCreate(userRoles);

  await Volume.sync();
  await Volume.bulkCreate(volumes);

  await Book.sync();
  await Book.bulkCreate(books);

  await Chapter.sync();
  await Chapter.bulkCreate(chapters);

  await Verse.sync();
  await Verse.bulkCreate(verses);

  await Person.sync();
  await Person.bulkCreate(people);

  await Place.sync();

  await List.sync();

  await ListItem.sync();

  await Thing.sync();

  await Event.sync();

  await Mark.sync();
  await Mark.bulkCreate(marks);

  await Question.sync();

  await Answer.sync();

  await Session.sync();

  await PersonLink.sync();
  await PersonLink.bulkCreate(peopleLinks);
};

seed().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
