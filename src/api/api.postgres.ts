import sequelize, {Model, ModelCtor, Op} from 'sequelize';
import scriptureLinkHref from '../utils/scriptureLinkHref';
import {v4 as uuid} from 'uuid';
import {
  Mutations,
  Queries,
  AnswerRecord,
  BookRecord,
  EventRecord,
  MarkRecord,
  PatchRecord,
  PersonRecord,
  PlaceRecord,
  QuestionRecord,
  RoleRecord,
  ThingRecord,
  UserRecord,
  UserRoleRecord,
  VerseRecord,
  VolumeRecord,
  Audited,
  ListRecord,
  ListItemRecord,
  UserWithRoles,
  ID,
  ChapterRecord,
  GoogleUserInfo,
  SessionRecord,
  PersonLinkRecord,
} from '../utils/types';
import hasRole from '../utils/hasRole';
import {logger} from '../utils/logger';

const {DATABASE_URL} = process.env;

const sql = new sequelize.Sequelize(DATABASE_URL!, {
  dialect: 'postgres',
  ssl: process.env.NODE_ENV === 'production',
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
  logging: false,
});

function dateGetter(this: {getDataValue: Function}) {
  return new Date(this.getDataValue('lastUpdatedDate')).getTime();
}

const User = sql.define<Model<UserRecord, UserRecord>>(
  'user',
  {
    id: {
      type: sequelize.UUIDV4,
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
      type: sequelize.UUIDV4,
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
      get: dateGetter,
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
      type: sequelize.UUIDV4,
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
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    roleId: {
      type: sequelize.UUIDV4,
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

const Volume = sql.define<Model<Audited<VolumeRecord>, Audited<VolumeRecord>>>(
  'volumes',
  {
    id: {
      type: sequelize.UUIDV4,
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
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
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

const Book = sql.define<Model<Audited<BookRecord>, Audited<BookRecord>>>(
  'books',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Volume,
        key: 'id',
      },
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
      type: sequelize.UUIDV4,
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
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {model: User, key: 'id'},
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {model: User, key: 'id'},
    },
  },
  {
    tableName: 'books',
  },
);

const Chapter = sql.define<
  Model<Audited<ChapterRecord>, Audited<ChapterRecord>>
>(
  'chapters',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Book,
        key: 'id',
      },
    },
    bookId: {
      type: sequelize.UUIDV4,
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
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
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

const Verse = sql.define<Model<Audited<VerseRecord>, Audited<VerseRecord>>>(
  'verses',
  {
    id: {
      type: sequelize.UUIDV4,
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
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: Chapter,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
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

const Person = sql.define<Model<Audited<PersonRecord>, Audited<PersonRecord>>>(
  'person',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    biography: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
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

const PersonLink = sql.define<
  Model<Audited<PersonLinkRecord>, Audited<PersonLinkRecord>>
>(
  'people_links',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fromPersonId: {
      type: sequelize.UUIDV4,
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
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: Person,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {tableName: 'people_links'},
);

const Place = sql.define<Model<Audited<PlaceRecord>, Audited<PlaceRecord>>>(
  'places',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'places_uniq_name',
    },
    position: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'places',
  },
);

const List = sql.define<Model<Audited<ListRecord>, Audited<ListRecord>>>(
  'lists',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'places_uniq_name',
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
      unique: 'places_uniq_name',
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'places',
  },
);

const ListItem = sql.define<
  Model<Audited<ListItemRecord>, Audited<ListItemRecord>>
>(
  'list_items',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    listId: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: List,
        key: 'id',
      },
    },
    text: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'places',
  },
);

const Thing = sql.define<Model<Audited<ThingRecord>, Audited<ThingRecord>>>(
  'things',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'things_uniq_name',
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'things',
  },
);

const Event = sql.define<Model<Audited<EventRecord>, Audited<EventRecord>>>(
  'events',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
      unique: 'events_uniq_name',
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'events',
  },
);

const Mark = sql.define<Model<Audited<MarkRecord>, Audited<MarkRecord>>>(
  'marks',
  {
    id: {
      type: sequelize.UUIDV4,
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
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Verse,
        key: 'id',
      },
    },
    speakerId: {
      type: sequelize.UUIDV4,
      allowNull: true,
    },
    personId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Person,
        key: 'id',
      },
    },
    placeId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Place,
        key: 'id',
      },
    },
    thingId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Thing,
        key: 'id',
      },
    },
    eventId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Event,
        key: 'id',
      },
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
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

const Patch = sql.define<
  Model<Audited<PatchRecord, false>, Audited<PatchRecord, false>>
>(
  'patches',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    table: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    data: {
      type: sequelize.JSON,
      allowNull: false,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    editedRecordId: {
      type: sequelize.UUIDV4,
      allowNull: true,
    },
  },
  {
    tableName: 'patches',
  },
);

const Question = sql.define<
  Model<Audited<QuestionRecord>, Audited<QuestionRecord>>
>(
  'questions',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    verseId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Verse,
        key: 'id',
      },
    },
    personId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Person,
        key: 'id',
      },
    },
    placeId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Place,
        key: 'id',
      },
    },
    thingId: {
      type: sequelize.UUIDV4,
      allowNull: true,
      references: {
        model: Thing,
        key: 'id',
      },
    },
    eventId: {
      type: sequelize.UUIDV4,
      allowNull: true,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'questions',
    schema: 'public',
  },
);

const Answer = sql.define<Model<Audited<AnswerRecord>, Audited<AnswerRecord>>>(
  'answers',
  {
    id: {
      type: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    questionId: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
    },
    text: {
      type: sequelize.TEXT,
      allowNull: false,
    },
    lastUpdatedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    lastUpdatedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    approvedDate: {
      get: dateGetter,
      type: sequelize.DATE,
      allowNull: false,
    },
    approvedBy: {
      type: sequelize.UUIDV4,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'answers',
  },
);

const getAllVolumes = async (): Promise<Array<VolumeRecord>> => {
  const volumes = await Volume.findAll();
  return volumes.map((v) => v.get());
};

const getVolumeByTitle = async (title: string): Promise<VolumeRecord> => {
  const volume = await Volume.findOne({where: {title}});
  if (!volume) {
    throw new Error(`Missing Volume (title: ${title})`);
  }
  return volume.get();
};

const getAllBooksByVolumeId = async (volumeId: ID): Promise<BookRecord[]> => {
  const books = await Book.findAll({where: {volumeId}});
  return books.map((b) => b.get());
};

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

const getBookByTitle = async (
  volumeId: ID,
  title: string,
): Promise<BookRecord> => {
  const book = await Book.findOne({where: {volumeId, title}});
  if (!book) {
    throw new Error('Not Found');
  }
  return book.get();
};

const getAllChaptersByBookId = async (
  _volumeId: ID,
  bookId: ID,
): Promise<ChapterRecord[]> => {
  const chapters = await Chapter.findAll({where: {bookId}});
  return chapters.map((c) => c.get());
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
  return verses.map((v) => v.get());
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
    throw new Error('not found');
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

const getChapterUrl = async (chapter: ChapterRecord): Promise<string> => {
  const book = await getBookById(chapter.bookId);
  const volume = await getVolumeById(book.volumeId);
  return scriptureLinkHref(volume.title, book.title, chapter.number);
};

const queryPrevChapterUrl = async (
  _volumeId: ID,
  chapterId: ID,
): Promise<string | null> => {
  const prevChapter = await findPrevChapter(chapterId);
  return prevChapter ? getChapterUrl(prevChapter) : null;
};

const queryNextChapterUrl = async (
  _volumeId: ID,
  chapterId: ID,
): Promise<string | null> => {
  const prevChapter = await findNextChapter(chapterId);
  return prevChapter ? getChapterUrl(prevChapter) : null;
};

const getVolumeById = async (id: ID): Promise<VolumeRecord> => {
  const volume = await Volume.findOne({where: {id}});
  if (!volume) {
    throw new Error(`Missing Volume (id: ${id})`);
  }
  return volume.get();
};

const getAllPeople = async (): Promise<Array<PersonRecord>> => {
  const people = await Person.findAll();
  return people.map((p) => p.get());
};

const getAllMarksByChapterId = async (
  _volumeId: ID,
  chapterId: ID,
): Promise<Array<MarkRecord>> => {
  const verses = await getAllVersesByChapterId('__IGNORED__', chapterId);
  const verseIds = verses.map((v) => v.id);
  const marks = await Mark.findAll({where: {verseId: {[Op.in]: verseIds}}});
  return marks.map((m) => m.get());
};

const getUserById = async (id: ID): Promise<UserRecord> => {
  const user = await User.findOne({where: {id}});
  if (!user) {
    throw new Error('not found');
  }
  return user.get();
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
      email: email ?? user.get('email'), // TODO: when we add more providers, we'll need to handle dupe emails somehow
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

const getAllRoles = async (): Promise<Array<RoleRecord>> => {
  const roles = await Role.findAll();
  return roles.map((r) => r.get());
};

const getUserRolesById = async (userId: ID): Promise<Array<RoleRecord>> => {
  const userRoles = await UserRole.findAll({where: {userId}});
  const roleIds = userRoles.map(
    (ur) => ur.get('roleId') as UserRoleRecord['roleId'],
  );
  const roles = await Role.findAll({where: {id: {[Op.in]: roleIds}}});
  const roleRecords = roles.map((r) => r.get());
  if (roleRecords.find((r) => r.name === 'admin')) {
    return getAllRoles();
  }
  return roleRecords;
};

const makeCreateRecord = <
  TABLE extends PatchRecord['table'],
  NEW_RECORD extends (PatchRecord & {table: TABLE})['data']
>(
  table: TABLE,
  ModelClass: ModelCtor<Model<Audited<NEW_RECORD & {id: ID}>>>,
) => async (newRecord: NEW_RECORD, user?: UserWithRoles): Promise<ID> => {
  if (!user) {
    throw new Error('user is required');
  }
  const now = Date.now();
  if (hasRole('moderator', user)) {
    // @ts-expect-error
    const record: Audited<NEW_RECORD & {id: ID}> = {
      ...newRecord,
      id: uuid(),
      lastUpdatedBy: user.id,
      lastUpdatedDate: now,
      approvedBy: user.id,
      approvedDate: now,
    };
    const modelInstance = await ModelClass.create(record);
    return modelInstance.get().id;
  }
  const patch = await Patch.create({
    id: uuid(),
    table: table as any,
    // @ts-expect-error
    data: newRecord,
    lastUpdatedBy: user.id,
    lastUpdatedDate: now,
  });
  return patch.get().id;
};

const makeUpdateRecord = <
  TABLE extends PatchRecord['table'],
  RECORD extends (PatchRecord & {table: TABLE})['data'] & {id: ID}
>(
  table: TABLE,
  ModelClass: ModelCtor<Model<Audited<RECORD>, Audited<RECORD>>>,
) => async (newRecord: RECORD, user?: UserWithRoles): Promise<void> => {
  if (!user) {
    throw new Error('user is required');
  }
  const now = Date.now();
  const instance = await ModelClass.findOne({where: {id: newRecord.id}});
  if (instance) {
    if (hasRole('moderator', user)) {
      await instance.update(newRecord);
      logger.info({table, user, record: instance.get()}, 'updated record');
      return;
    }
    const patch = await Patch.create({
      id: uuid(),
      // @ts-expect-error
      table: table,
      // @ts-expect-error
      data: newRecord,
      lastUpdatedBy: user.id,
      lastUpdatedDate: now,
    });
    logger.info({table, user, record: patch.get()}, 'created patch record');
    return;
  }
  const patch = await Patch.findOne({where: {id: newRecord.id}});
  if (patch) {
    await patch.update({
      data: newRecord,
      lastModifiedBy: user.id,
      lastModifiedDate: now,
    });
    return;
  }
  throw new Error('not found');
};

const makeDeleteRecord = (ModelClass: ModelCtor<Model<any, any>>) => async (
  id: ID,
): Promise<void> => {
  await ModelClass.destroy({where: {id}});
};

export const queries: Queries = {
  getAllVolumes,
  getVolumeByTitle,
  getAllBooksByVolumeId,
  getChapterById,
  getBookById,
  getBookByTitle,
  getAllChaptersByBookId,
  getChapterByBookIdAndNumber,
  getAllVersesByChapterId,
  queryPrevChapterUrl,
  queryNextChapterUrl,
  getAllPeople,
  getAllMarksByChapterId,
  getUserById,
  getUserRolesById,
};

export const mutations: Mutations = {
  createAnswer: makeCreateRecord('answers', Answer),
  createEvent: makeCreateRecord('events', Event),
  createList: makeCreateRecord('lists', List),
  createListItem: makeCreateRecord('list_items', ListItem),
  createMark: makeCreateRecord('marks', Mark),
  createPerson: makeCreateRecord('people', Person),
  createPersonLink: makeCreateRecord('people_links', PersonLink),
  createPlace: makeCreateRecord('places', Place),
  createQuestion: makeCreateRecord('questions', Question),
  createThing: makeCreateRecord('things', Thing),

  updateAnswer: makeUpdateRecord('answers', Answer),
  updateEvent: makeUpdateRecord('events', Event),
  updateList: makeUpdateRecord('lists', List),
  updateListItem: makeUpdateRecord('list_items', ListItem),
  updateMark: makeUpdateRecord('marks', Mark),
  updatePerson: makeUpdateRecord('people', Person),
  updatePersonLink: makeUpdateRecord('people_links', PersonLink),
  updatePlace: makeUpdateRecord('places', Place),
  updateQuestion: makeUpdateRecord('questions', Question),
  updateThing: makeUpdateRecord('things', Thing),

  deleteAnswer: makeDeleteRecord(Answer),
  deleteEvent: makeDeleteRecord(Event),
  deleteList: makeDeleteRecord(List),
  deleteListItem: makeDeleteRecord(ListItem),
  deleteMark: makeDeleteRecord(Mark),
  deletePerson: makeDeleteRecord(Person),
  deletePersonLink: makeDeleteRecord(PersonLink),
  deletePlace: makeDeleteRecord(Place),
  deleteQuestion: makeDeleteRecord(Question),
  deleteThing: makeDeleteRecord(Thing),
};

export {
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
  Patch,
  Question,
  Answer,
  Session,
  PersonLink,
  findOrCreateOrUpdateGoogleUser,
};
