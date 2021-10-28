import sequelize, {Model, ModelCtor, Op, Options} from 'sequelize';
import {v4 as uuid} from 'uuid';
import {
  BookRecord,
  ChapterRecord,
  EditableRecord,
  GoogleUserInfo,
  ID,
  MarkRecord,
  MarkRecordPlus,
  PersonLinkRecord,
  PersonRecord,
  RoleRecord,
  SessionRecord,
  Unsaved,
  UserRecord,
  UserRoleRecord,
  UserWithRoles,
  VerseRecord,
  VolumeRecord,
} from '../types';
import {logger} from '../utils/logger';

const {DATABASE_URL} = process.env;

const SQL_OPTIONS: Options = {
  dialect: 'postgres',
  ssl: IS_PROD,
  dialectOptions: IS_PROD
    ? {
        ssl: {require: true, rejectUnauthorized: false},
      }
    : {},
  define: {
    timestamps: false, // disable automatic createdAt & updatedAt columns
    freezeTableName: true, // disable automatic pluralization of table names
    schema: 'public',
  },
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
  logging: msg => {
    logger.info(msg);
  },
};

const sql = new sequelize.Sequelize(DATABASE_URL!, SQL_OPTIONS);

const dateGetter = (key: string) =>
  function (this: {getDataValue: Function}) {
    // eslint-disable-next-line no-invalid-this
    return new Date(this.getDataValue(key)).getTime();
  };

const User = sql.define<Model<UserRecord, UserRecord>>(
  'user',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    googleId: {
      type: sequelize.TEXT,
      allowNull: true,
      unique: 'googleId',
    },
    givenName: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    familyName: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    email: {
      type: sequelize.TEXT,
      allowNull: true,
      unique: 'email',
    },
    photo: {
      type: sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
  },
);

const Session = sql.define<Model<SessionRecord, SessionRecord>>(
  'user',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: sequelize.JSON,
      allowNull: false,
    },
    expirationDate: {
      type: sequelize.DATE,
      allowNull: true,
      get: dateGetter('expirationDate'),
    },
  },
  {
    tableName: 'sessions',
  },
);

const Role = sql.define<Model<RoleRecord, RoleRecord>>(
  'role',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'roles_uniq_name',
    },
  },
  {
    tableName: 'roles',
  },
);

const UserRole = sql.define<Model<UserRoleRecord, UserRoleRecord>>(
  'userRole',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    roleId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    tableName: 'user_roles',
  },
);

const Volume = sql.define<Model<VolumeRecord, VolumeRecord>>(
  'volumes',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'volumes_uniq_title',
    },
    longTitle: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    abbr: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    order: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter('approvedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'volumes',
  },
);

const Book = sql.define<Model<BookRecord, BookRecord>>(
  'books',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'title',
    },
    longTitle: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'longTitle',
    },
    subtitle: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    volumeId: {
      type: sequelize.UUID,
      allowNull: false,
    },
    order: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    abbr: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {model: User, key: 'id'},
    },
    approvedDate: {
      get: dateGetter('approvedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {model: User, key: 'id'},
    },
  },
  {
    tableName: 'books',
  },
);

const Chapter = sql.define<Model<ChapterRecord, ChapterRecord>>(
  'chapters',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    bookId: {
      type: sequelize.UUID,
      allowNull: false,
      unique: 'chapters_uniq_number',
    },
    number: {
      type: sequelize.INTEGER,
      allowNull: false,
      unique: 'chapters_uniq_number',
    },
    summary: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter('dateGetter'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'chapters',
  },
);

const Verse = sql.define<Model<VerseRecord, VerseRecord>>(
  'verses',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    number: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    text: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    chapterId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: Chapter,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter('approvedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'verses',
  },
);

const Person = sql.define<Model<PersonRecord, PersonRecord>>(
  'person',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    order: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    circaBirth: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    circa: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    circaDeath: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter('approvedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'people',
  },
);

const PersonLink = sql.define<Model<PersonLinkRecord, PersonLinkRecord>>(
  'people_links',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    fromPersonId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: Person,
        key: 'id',
      },
    },
    type: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    toPersonId: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: Person,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter('approvedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {tableName: 'people_links'},
);

const Mark = sql.define<Model<MarkRecord, MarkRecord>>(
  'marks',
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    startIndex: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    endIndex: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    verseId: {
      type: sequelize.UUID,
      allowNull: true,
      references: {
        model: Verse,
        key: 'id',
      },
    },
    speakerId: {
      type: sequelize.UUID,
      allowNull: true,
    },
    personId: {
      type: sequelize.UUID,
      allowNull: true,
      references: {
        model: Person,
        key: 'id',
      },
    },
    lastUpdatedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter('lastUpdatedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter('approvedDate'),
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'marks',
  },
);

Volume.hasMany(Book);
Book.belongsTo(Volume);

Book.hasMany(Chapter);
Chapter.belongsTo(Book);

Chapter.hasMany(Verse);
Verse.belongsTo(Chapter);

Verse.hasMany(Mark);
Mark.belongsTo(Verse);

const getChapterById = async (id: ID): Promise<ChapterRecord> => {
  const chapter = await Chapter.findOne({where: {id}});
  if (!chapter) {
    throw new Error('Not Found');
  }
  return chapter.get();
};

const getBookById = async (id: ID): Promise<BookRecord> => {
  const book = await Book.findOne({where: {id}});
  if (!book) {
    throw new Error(`Missing Book: (id: ${id})`);
  }
  return book.get();
};

const findChapterByBookIdAndNumber = async (
  bookId: ID,
  number: string | number,
): Promise<ChapterRecord | null> => {
  const chapter = await Chapter.findOne({
    where: {bookId, number},
    order: [['number', 'ASC']],
  });
  if (!chapter) {
    return null;
  }
  return chapter.get();
};

const getChapterByBookIdAndNumber = async (
  _volumeId: ID,
  bookId: ID,
  number: string | number,
): Promise<ChapterRecord> => {
  const chapter = await findChapterByBookIdAndNumber(bookId, number);
  if (!chapter) {
    throw new Error(`Missing Chapter (Book: ${bookId}, Number: ${number})`);
  }
  return chapter;
};

const getAllVersesByChapterId = async (
  _volumeId: ID,
  chapterId: ID,
): Promise<Array<VerseRecord>> => {
  const verses = await Verse.findAll({
    where: {chapterId},
    order: [['number', 'ASC']],
  });
  return verses.map(v => v.get());
};

const findBookByOrder = async (order: number): Promise<BookRecord | null> => {
  const book = await Book.findOne({where: {order}});
  if (!book) {
    return null;
  }
  return book.get();
};

const getBookByOrder = async (order: number): Promise<BookRecord> => {
  const book = await findBookByOrder(order);
  if (!book) {
    throw new Error(`Missing Book (order: ${order}`);
  }
  return book;
};

const getLastChapterByBookId = async (bookId: ID): Promise<ChapterRecord> => {
  const lastChapter = await Chapter.findOne({
    where: {bookId},
    order: [['number', 'DESC']],
    limit: 1,
  });

  if (!lastChapter) {
    throw new Error(`Unable to find last chapter for book (ID: ${bookId})`);
  }

  return lastChapter.get();
};

const findPrevChapter = async (
  chapterId: ID,
): Promise<ChapterRecord | null> => {
  const chapter = await getChapterById(chapterId);
  if (chapter.number > 1) {
    return getChapterByBookIdAndNumber(
      '', // not used anyway, so we don't need it here, right?
      chapter.bookId,
      chapter.number - 1,
    );
  }
  const book = await getBookById(chapter.bookId);
  if (book.order > 1) {
    const prevBook = await getBookByOrder(book.order - 1);
    return getLastChapterByBookId(prevBook.id);
  }
  return null;
};

const findNextChapter = async (
  chapterId: ID,
): Promise<ChapterRecord | null> => {
  const chapter = await getChapterById(chapterId);
  const nextChapter = await findChapterByBookIdAndNumber(
    chapter.bookId,
    chapter.number + 1,
  );
  if (nextChapter) {
    return nextChapter;
  }
  const book = await getBookById(chapter.bookId);
  const nextBook = await findBookByOrder(book.order + 1);
  if (nextBook) {
    return getChapterByBookIdAndNumber(book.volumeId, nextBook.id, 1);
  }
  return null;
};

const getVolumeById = async (id: ID): Promise<VolumeRecord> => {
  const volume = await Volume.findOne({where: {id}});
  if (!volume) {
    throw new Error(`Missing Volume (id: ${id})`);
  }
  return volume.get();
};

const findOrCreateOrUpdateGoogleUser = async (
  profile: GoogleUserInfo,
): Promise<UserRecord> => {
  const user = await User.findOne({where: {googleId: profile.id}});

  const {
    email = null,
    given_name: givenName = null,
    family_name: familyName = null,
    name = null,
    picture: photo = null,
  } = profile;

  if (user) {
    await user.update({
      givenName: givenName ?? user.get('name'),
      familyName: familyName ?? user.get('familyName'),
      name: name ?? user.get('name'),
      email: email ?? user.get('email'),
      photo: photo ?? user.get('photo'),
    });
    return user.get();
  }

  const id = uuid();
  const newUser = await User.create({
    id,
    googleId: profile.id,
    givenName,
    familyName,
    name,
    email,
    photo,
  });
  return newUser.get();
};

const makeCreateRecord = <RECORD extends EditableRecord>(
  ModelClass: ModelCtor<Model<RECORD, RECORD>>,
) => async (
  newRecord: Unsaved<RECORD>,
  user: UserWithRoles,
  transaction?: sequelize.Transaction,
): Promise<RECORD> => {
  const now = Date.now();
  // @ts-expect-error
  const model = await ModelClass.create(
    {
      ...newRecord,
      id: uuid(),
      lastUpdatedBy: user.id,
      lastUpdatedDate: now,
      approvedBy: user.id,
      approvedDate: now,
    } as RECORD,
    {returning: true, transaction},
  );
  return model.get();
};

const makeUpdateRecord = <RECORD extends EditableRecord>(
  ModelClass: ModelCtor<Model<RECORD, RECORD>>,
) => async (
  newRecord: RECORD,
  user: UserWithRoles,
  transaction?: sequelize.Transaction,
): Promise<RECORD> => {
  if (!user) {
    throw new Error('user is required');
  }
  const now = Date.now();
  const instance = await ModelClass.findOne({where: {id: newRecord.id}});
  if (instance) {
    // @ts-expect-error
    await instance.update(
      {
        ...newRecord,
        lastUpdatedBy: user.id,
        lastUpdatedDate: now,
        approvedBy: user.id,
        approvedDate: now,
      },
      {transaction, returning: true},
    );
    return instance.get();
  }
  throw new Error('not found');
};

const makeDeleteRecord = (ModelClass: ModelCtor<Model<any, any>>) => async (
  id: ID,
): Promise<void> => {
  await ModelClass.destroy({where: {id}});
};

const getAllRoles = async (): Promise<Array<RoleRecord>> => {
  const roles = await Role.findAll();
  return roles.map(r => r.get());
};

export const getVersesAndMarksBySpeakerId = async (
  speakerId: ID,
  limit?: number,
  offset?: number,
): Promise<Array<MarkRecordPlus>> => {
  const marks = await Mark.findAll({
    include: [
      {
        model: Verse,
        include: [
          {
            model: Chapter,
            include: [
              {
                model: Book,
                include: [
                  {
                    model: Volume,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    where: {speakerId},
    order: [
      [Verse, Chapter, Book, Volume, 'order', 'ASC'],
      [Verse, Chapter, Book, 'order', 'ASC'],
      [Verse, Chapter, 'number', 'ASC'],
      [Verse, 'number', 'ASC'],
    ],
    limit,
    offset,
  });
  return marks.map(v => v.get() as any);
};

export const countVersesBySpeakerId = async (
  speakerId: ID,
): Promise<number> => {
  return await Verse.count({
    include: [
      {
        model: Mark,
        required: true,
        where: {
          speakerId,
        },
      },
    ],
  });
};

export const getVolumeByTitle = async (
  title: string,
): Promise<VolumeRecord> => {
  const volume = await Volume.findOne({where: {title}});
  if (!volume) {
    throw new Error(`Missing Volume (title: ${title})`);
  }
  return volume.get();
};

export const getBookByVolumeAndTitle = async (
  volumeId: ID,
  title: string,
): Promise<BookRecord> => {
  const book = await Book.findOne({where: {volumeId, title}});
  if (!book) {
    throw new Error('Not Found');
  }
  return book.get();
};

export const getAllMarksByChapterId = async (
  chapterId: ID,
): Promise<Array<MarkRecord>> => {
  const verses = await getAllVersesByChapterId('__IGNORED__', chapterId);
  const verseIds = verses.map(v => v.id);
  const marks = await Mark.findAll({where: {verseId: {[Op.in]: verseIds}}});
  return marks.map(m => m.get());
};

export const getUserRolesById = async (
  userId: ID,
): Promise<Array<RoleRecord>> => {
  const userRoles = await UserRole.findAll({where: {userId}});
  const roleIds = userRoles.map(
    ur => ur.get('roleId') as UserRoleRecord['roleId'],
  );
  const roles = await Role.findAll({where: {id: {[Op.in]: roleIds}}});
  const roleRecords = roles.map(r => r.get());
  if (roleRecords.find(r => r.name === 'admin')) {
    return getAllRoles();
  }
  return roleRecords;
};

export const getAdjacentChaptersById = async (
  chapterId: ID,
): Promise<{
  prev: {volume: VolumeRecord; book: BookRecord; chapter: ChapterRecord} | null;
  next: {volume: VolumeRecord; book: BookRecord; chapter: ChapterRecord} | null;
}> => {
  const prevChapter = await findPrevChapter(chapterId);
  const nextChapter = await findNextChapter(chapterId);
  const prevBook = prevChapter ? await getBookById(prevChapter.bookId) : null;
  const nextBook = nextChapter ? await getBookById(nextChapter.bookId) : null;
  const prevVolume = prevBook ? await getVolumeById(prevBook.volumeId) : null;
  const nextVolume = nextBook ? await getVolumeById(nextBook.volumeId) : null;
  return {
    prev:
      prevChapter && prevBook && prevVolume
        ? {volume: prevVolume, book: prevBook, chapter: prevChapter}
        : null,
    next:
      nextChapter && nextBook && nextVolume
        ? {volume: nextVolume, book: nextBook, chapter: nextChapter}
        : null,
  };
};

export {makeCreateRecord, makeUpdateRecord, makeDeleteRecord};

export {
  User,
  Role,
  UserRole,
  Volume,
  Book,
  Chapter,
  Verse,
  Person,
  Mark,
  Session,
  PersonLink,
  findOrCreateOrUpdateGoogleUser,
  sql,
};

export const deleteExpiredSessions = async (): Promise<number> => {
  return await Session.destroy({
    where: {
      expirationDate: {[Op.lt]: sequelize.fn('NOW')},
    },
  });
};

export const getAllSessions = async (): Promise<Array<SessionRecord>> => {
  return (await Session.findAll({where: {}})).map(m => m.get());
};

export const deleteSession = async (id: ID): Promise<void> => {
  await Session.destroy({where: {id}});
};

export const deleteAllSessions = async () => {
  await Session.destroy({where: {}});
};

export const countSessions = async () => {
  return await Session.count({where: {}});
};

export const getSession = async (
  sessionId: ID,
): Promise<SessionRecord | undefined> => {
  return (await Session.findOne({where: {id: sessionId}}))?.get();
};

export const createOrUpdateSession = async (
  id: ID,
  data: SessionRecord['data'],
  expirationDate: number,
) => {
  const model = await Session.findOne({where: {id}});
  if (model) {
    return (await model.update({data, expirationDate})).get();
  }
  return (await Session.create({id, data, expirationDate})).get();
};

export const setSessionExpirationDate = async (
  sessionId: ID,
  expirationDate: number,
) => {
  const model = await Session.findOne({where: {id: sessionId}});
  if (!model) {
    throw new Error('session not found');
  }
  await model.update({expirationDate});
};

export const mergePeople = async (ids: Array<ID>) => {
  await Promise.all(
    ids.slice(1).map(async id => {
      await Mark.update({speakerId: ids[0]}, {where: {speakerId: id}});
      await PersonLink.update(
        {fromPersonId: ids[0]},
        {where: {fromPersonId: id}},
      );
      await PersonLink.update({toPersonId: ids[0]}, {where: {toPersonId: id}});
      await Person.destroy({where: {id}});
    }),
  );
};
