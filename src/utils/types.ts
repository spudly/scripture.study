import {ReactElement} from 'react';

declare global {
  namespace Express {
    interface User extends UserWithRoles {}
    interface SessionData {
      user: UserWithRoles;
    }
  }
}

export type Point = {x: number; y: number};

export type VerseSelection = {
  verseId: ID;
  startIndex: number | null;
  endIndex: number | null;
};

export type ID = string;

export type VolumeMeta = {
  key: 'lastUpdated';
  value: number;
};

export type StateMicroTheme = {
  bgColor: string;
  textColor: string;
  borderColor: string;
};

export type MicroTheme = {
  default: StateMicroTheme;
  hover: StateMicroTheme;
  active: StateMicroTheme;
  activated: StateMicroTheme;
};

export type DrawerView = {type: 'CREATE_ANNOTATIONS'; marks: Array<MarkRecord>};

export type Unstyled<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  'className' | 'style'
>;

export type SlimVolume = {id: ID; title: string};
export type SlimBook = {id: ID; title: string; numChapters: number};
export type SlimChapter = {id: ID; number: number; numVerses: number};
export type SlimVerse = {id: ID; number: number};

export type SlimBookAndChapter = {book: SlimBook; chapter: SlimChapter};

export type SlimBookAndChapterAndVerse = SlimBookAndChapter & {
  verse: SlimVerse;
};

export type DirectoryEntry = {
  id: ID;
  href: string;
  title: string;
};

export type PromiseResult<PROMISE> = PROMISE extends Promise<infer RESULT>
  ? RESULT
  : never;

/** @deprecated */
export type QueryOptions = {};

/** @deprecated */
export interface Queries {
  /** @deprecated */
  getAllVolumes(opts?: QueryOptions): Promise<Array<VolumeRecord>>;

  /** @deprecated */
  getVolumeByTitle(title: string, opts?: QueryOptions): Promise<VolumeRecord>;

  /** @deprecated */
  getAllBooksByVolumeId(
    volumeId: ID,
    opts?: QueryOptions,
  ): Promise<Array<BookRecord>>;

  /** @deprecated */
  getChapterById(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<ChapterRecord>;

  /** @deprecated */
  getBookById(
    volumeId: ID,
    bookId: ID,
    opts?: QueryOptions,
  ): Promise<BookRecord>;

  /** @deprecated */
  getBookByTitle(
    volumeId: ID,
    title: string,
    opts?: QueryOptions,
  ): Promise<BookRecord>;

  /** @deprecated */
  getAllChaptersByBookId(
    volumeId: ID,
    bookId: ID,
    opts?: QueryOptions,
  ): Promise<Array<ChapterRecord>>;

  /** @deprecated */
  getChapterByBookIdAndNumber(
    volumeId: ID,
    bookId: ID,
    number: string | number,
    opts?: QueryOptions,
  ): Promise<ChapterRecord>;

  /** @deprecated */
  getAllVersesByChapterId(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<Array<VerseRecord>>;

  /** @deprecated */
  queryPrevChapterUrl(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<string | null>;

  /** @deprecated */
  queryNextChapterUrl(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<string | null>;

  /** @deprecated */
  getAllPeople(opts?: QueryOptions): Promise<Array<PersonRecord>>;

  /** @deprecated */
  getAllMarksByChapterId(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<Array<MarkRecord>>;

  /** @deprecated */
  getUserById(userId: ID): Promise<UserRecord>;

  /** @deprecated */
  getUserRolesById(userId: ID): Promise<Array<RoleRecord>>;
}

export type BulkMutationRequestBody<RECORD> = {
  create?: Array<Unsaved<RECORD>>;
  update?: Array<RECORD>;
  delete?: Array<ID>;
};

export type BulkMutationResponseBody<RECORD> = {
  created?: RECORD[];
  updated?: RECORD[];
  deleted?: ID[];
};

export type RoleName = 'admin' | 'moderator' | 'author';

export type UserWithRoles = UserRecord & {roles: Array<RoleName>};

/** @deprecated */
export interface Mutations {
  /** @deprecated */
  createAnswer(
    answer: Unsaved<AnswerRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;

  /** @deprecated */
  createEvent(event: Unsaved<EventRecord>, user?: UserWithRoles): Promise<ID>;

  /** @deprecated */
  createList(list: Unsaved<ListRecord>, user?: UserWithRoles): Promise<ID>;

  /** @deprecated */
  createListItem(
    listitem: Unsaved<ListItemRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;

  /** @deprecated */
  createMark(mark: Unsaved<MarkRecord>, user?: UserWithRoles): Promise<ID>;

  /** @deprecated */
  createPerson(
    person: Unsaved<PersonRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;

  /** @deprecated */
  createPersonLink(
    person: Unsaved<PersonLinkRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;

  /** @deprecated */
  createPlace(place: Unsaved<PlaceRecord>, user?: UserWithRoles): Promise<ID>;

  /** @deprecated */
  createQuestion(
    question: Unsaved<QuestionRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;

  /** @deprecated */
  createThing(thing: Unsaved<ThingRecord>, user?: UserWithRoles): Promise<ID>;

  /** @deprecated */
  updateAnswer(answer: AnswerRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updateEvent(event: EventRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updateList(list: ListRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updateListItem(listitem: ListItemRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updateMark(mark: MarkRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updatePerson(person: PersonRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updatePersonLink(
    personLink: PersonLinkRecord,
    user?: UserWithRoles,
  ): Promise<void>;

  /** @deprecated */
  updatePlace(place: PlaceRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updateQuestion(question: QuestionRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  updateThing(thing: ThingRecord, user?: UserWithRoles): Promise<void>;

  /** @deprecated */
  deleteAnswer: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deleteEvent: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deleteList: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deleteListItem: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deleteMark: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deletePerson: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deletePersonLink: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deletePlace: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deleteQuestion: (id: ID, user?: UserWithRoles) => Promise<void>;

  /** @deprecated */
  deleteThing: (id: ID, user?: UserWithRoles) => Promise<void>;
}

export type MutationState =
  | {readyState: 'NONE'}
  | {readyState: 'LOADING'}
  | {readyState: 'COMPLETE'}
  | {readyState: 'ERROR'; error: Error};

export type NativeElement<
  TAG extends keyof JSX.IntrinsicElements
> = ReactElement<JSX.IntrinsicElements[TAG], TAG>;
export type ChildElements<T> = T | T[];

export type TableSection = NativeElement<'thead' | 'tbody' | 'tfoot'>;
export type TableRow = NativeElement<'tr'>;
export type TableCell = NativeElement<'th' | 'td'>;

export type EditableRecord = {
  id: ID;
  lastUpdatedBy: string;
  lastUpdatedDate: number;
  approvedBy: string;
  approvedDate: number;
};

export type UserRecord = {
  id: ID;
  googleId: string | null;
  givenName: string | null;
  familyName: string | null;
  name: string | null;
  email: string | null;
  photo: string | null;
};

export type SessionRecord = {
  id: ID;
  data: Express.SessionData;
  expirationDate: number;
};

export type RoleRecord = {
  id: ID;
  name: RoleName;
};

export type UserRoleRecord = {id: ID; userId: ID; roleId: ID};

export type AnswerRecord = {
  id: ID;
  questionId: ID;
  text: string;
} & EditableRecord;

export type BookRecord = {
  id: ID;
  title: string;
  longTitle: string;
  subtitle: string;
  volumeId: ID;
  order: number;
  abbr: string;
} & EditableRecord;

export type ChapterRecord = {
  id: ID;
  bookId: ID;
  number: number;
  summary: string | null;
} & EditableRecord;

export type EventRecord = {
  id: ID;
  name: string;
  description: string;
} & EditableRecord;

export type SpeakerMarkRecord = {
  id: ID;
  type: 'speaker';
  startIndex: number | null;
  endIndex: number | null;
  verseId: ID;
  speakerId: ID;
  personId: null;
  placeId: null;
  thingId: null;
  eventId: null;
} & EditableRecord;

export type MentionMarkRecord = {
  id: ID;
  type: 'mention';
  startIndex: number | null;
  endIndex: number | null;
  verseId: string | null;
  speakerId: null;
  personId: string | null;
  placeId: string | null;
  thingId: string | null;
  eventId: string | null;
} & EditableRecord;

export type MarkRecord = SpeakerMarkRecord | MentionMarkRecord;

export type PersonRecord = {
  id: ID;
  name: string | null;
  order: number | null;
  description: string | null;
} & EditableRecord;

export type PersonLinkRecord = {
  id: ID;
  fromPersonId: ID;
  type: 'childOf' | 'spouseOf' | 'descendantOf';
  toPersonId: ID;
} & EditableRecord;

export type ListRecord = {
  id: ID;
  name: string;
  description: string | null;
} & EditableRecord;

export type ListItemRecord = {
  id: ID;
  listId: ID;
  text: string;
} & EditableRecord;

export type PlaceRecord = {
  id: ID;
  name: string;
  position: string;
} & EditableRecord;

export type QuestionRecord = {
  id: ID;
  text: string;
  verseId: string | null;
  personId: string | null;
  placeId: string | null;
  thingId: string | null;
  eventId: string | null;
} & EditableRecord;

export type ThingRecord = {
  id: ID;
  name: string;
  description: string;
} & EditableRecord;

export type VerseRecord = {
  id: ID;
  chapterId: ID;
  number: number;
  text: string;
} & EditableRecord;

export type VolumeRecord = {
  id: ID;
  title: string;
  longTitle: string;
  abbr: string;
  order: number;
} & EditableRecord;

export type Unsaved<RECORD> = Omit<RECORD, 'id' | keyof EditableRecord>;

export type GoogleAccessTokenData = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
};

export type GoogleUserInfo = {
  id: string;
  email?: string;
  verified_email?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
};

export type MarkRecordPlus = MarkRecord & {
  verse: VerseRecord & {
    chapter: ChapterRecord & {
      book: BookRecord & {
        volume: VolumeRecord;
      };
    };
  };
};

export type GetAllResponseBody<ITEM> = {
  count: number;
  limit: number | null;
  offset: number;
  items: Array<ITEM>;
};
