import {ReactElement} from 'react';

declare global {
  namespace Express {
    interface User extends UserWithRoles {}
    interface SessionData {
      user: UserWithRoles;
    }
  }
}

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

export type QueryOptions = {};

export interface Queries {
  getAllVolumes(opts?: QueryOptions): Promise<Array<VolumeRecord>>;
  getVolumeByTitle(title: string, opts?: QueryOptions): Promise<VolumeRecord>;
  getAllBooksByVolumeId(
    volumeId: ID,
    opts?: QueryOptions,
  ): Promise<Array<BookRecord>>;
  getChapterById(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<ChapterRecord>;
  getBookById(
    volumeId: ID,
    bookId: ID,
    opts?: QueryOptions,
  ): Promise<BookRecord>;
  getBookByTitle(
    volumeId: ID,
    title: string,
    opts?: QueryOptions,
  ): Promise<BookRecord>;
  getAllChaptersByBookId(
    volumeId: ID,
    bookId: ID,
    opts?: QueryOptions,
  ): Promise<Array<ChapterRecord>>;
  getChapterByBookIdAndNumber(
    volumeId: ID,
    bookId: ID,
    number: string | number,
    opts?: QueryOptions,
  ): Promise<ChapterRecord>;
  getAllVersesByChapterId(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<Array<VerseRecord>>;
  queryPrevChapterUrl(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<string | null>;
  queryNextChapterUrl(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<string | null>;
  getAllPeople(opts?: QueryOptions): Promise<Array<PersonRecord>>;
  getAllMarksByChapterId(
    volumeId: ID,
    chapterId: ID,
    opts?: QueryOptions,
  ): Promise<Array<MarkRecord>>;
  getUserById(userId: ID): Promise<UserRecord>;
  getUserRolesById(userId: ID): Promise<Array<RoleRecord>>;
}

export type MutationRequestBody<RECORD> = {
  create?: Array<Unsaved<RECORD>>;
  update?: Array<RECORD>;
  delete?: Array<ID>;
  approve?: Array<ID>;
  disapprove?: Array<ID>;
};

export type MutationResponseBody = {
  createdIds?: string[];
  updatedIds?: string[];
  deletedIds?: string[];
  approvedIds?: string[];
  disapprovedIds?: string[];
};

export type RoleName = 'admin' | 'moderator' | 'author';

export type UserWithRoles = UserRecord & {roles: Array<RoleName>};

export interface Mutations {
  createAnswer(
    answer: Unsaved<AnswerRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;
  createEvent(event: Unsaved<EventRecord>, user?: UserWithRoles): Promise<ID>;
  createList(list: Unsaved<ListRecord>, user?: UserWithRoles): Promise<ID>;
  createListItem(
    listitem: Unsaved<ListItemRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;
  createMark(mark: Unsaved<MarkRecord>, user?: UserWithRoles): Promise<ID>;
  createPerson(
    person: Unsaved<PersonRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;
  createPlace(place: Unsaved<PlaceRecord>, user?: UserWithRoles): Promise<ID>;
  createQuestion(
    question: Unsaved<QuestionRecord>,
    user?: UserWithRoles,
  ): Promise<ID>;
  createThing(thing: Unsaved<ThingRecord>, user?: UserWithRoles): Promise<ID>;

  updateAnswer(answer: AnswerRecord, user?: UserWithRoles): Promise<void>;
  updateEvent(event: EventRecord, user?: UserWithRoles): Promise<void>;
  updateList(list: ListRecord, user?: UserWithRoles): Promise<void>;
  updateListItem(listitem: ListItemRecord, user?: UserWithRoles): Promise<void>;
  updateMark(mark: MarkRecord, user?: UserWithRoles): Promise<void>;
  updatePerson(person: PersonRecord, user?: UserWithRoles): Promise<void>;
  updatePlace(place: PlaceRecord, user?: UserWithRoles): Promise<void>;
  updateQuestion(question: QuestionRecord, user?: UserWithRoles): Promise<void>;
  updateThing(thing: ThingRecord, user?: UserWithRoles): Promise<void>;

  approve(patchId: ID, user?: UserWithRoles): Promise<ID>;
  disapprove(patchId: ID): Promise<void>;

  deleteAnswer: (id: ID, user?: UserWithRoles) => Promise<void>;
  deleteEvent: (id: ID, user?: UserWithRoles) => Promise<void>;
  deleteList: (id: ID, user?: UserWithRoles) => Promise<void>;
  deleteListItem: (id: ID, user?: UserWithRoles) => Promise<void>;
  deleteMark: (id: ID, user?: UserWithRoles) => Promise<void>;
  deletePerson: (id: ID, user?: UserWithRoles) => Promise<void>;
  deletePlace: (id: ID, user?: UserWithRoles) => Promise<void>;
  deleteQuestion: (id: ID, user?: UserWithRoles) => Promise<void>;
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

export type Audited<T, INCLUDE_APPROVAL extends boolean = true> = T & {
  lastUpdatedBy: string;
  lastUpdatedDate: number;
} & (INCLUDE_APPROVAL extends true
    ? {
        approvedBy: string;
        approvedDate: number;
      }
    : {});

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
};

export type BookRecord = {
  id: ID;
  title: string;
  longTitle: string;
  subtitle: string;
  volumeId: ID;
  order: number;
  abbr: string;
};

export type ChapterRecord = {
  id: ID;
  bookId: ID;
  number: number;
  summary: string | null;
};

export type EventRecord = {
  id: ID;
  name: string;
  description: string;
};

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
};

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
};

export type MarkRecord = SpeakerMarkRecord | MentionMarkRecord;

export type PersonRecord = {
  id: ID;
  name: string | null;
  biography: string | null;
  fatherId: string | null;
  motherId: string | null;
};

export type ListRecord = {
  id: ID;
  name: string;
  description: string | null;
};

export type ListItemRecord = {
  id: ID;
  listId: ID;
  text: string;
};

export type PlaceRecord = {
  id: ID;
  name: string;
  position: string;
};

export type QuestionRecord = {
  id: ID;
  text: string;
  verseId: string | null;
  personId: string | null;
  placeId: string | null;
  thingId: string | null;
  eventId: string | null;
};

export type ThingRecord = {
  id: ID;
  name: string;
  description: string;
};

export type VerseRecord = {
  id: ID;
  chapterId: ID;
  number: number;
  text: string;
};

export type VolumeRecord = {
  id: ID;
  title: string;
  longTitle: string;
  abbr: string;
  order: number;
};

export type Unsaved<RECORD> = Omit<RECORD, 'id'>;

export type PatchRecord = {id: ID; editedRecordId: string | null} & (
  | {
      table: 'answers';
      data: Unsaved<AnswerRecord>;
    }
  | {
      table: 'books';
      data: Unsaved<BookRecord>;
    }
  | {
      table: 'chapters';
      data: Unsaved<VerseRecord>;
    }
  | {
      table: 'events';
      data: Unsaved<EventRecord>;
    }
  | {
      table: 'marks';
      data: Unsaved<MarkRecord>;
    }
  | {
      table: 'people';
      data: Unsaved<PersonRecord>;
    }
  | {
      table: 'places';
      data: Unsaved<PlaceRecord>;
    }
  | {
      table: 'questions';
      data: Unsaved<QuestionRecord>;
    }
  | {
      table: 'roles';
      data: Unsaved<RoleRecord>;
    }
  | {
      table: 'things';
      data: Unsaved<ThingRecord>;
    }
  | {
      table: 'verses';
      data: Unsaved<VerseRecord>;
    }
  | {
      table: 'volumes';
      data: Unsaved<VolumeRecord>;
    }
  | {
      table: 'lists';
      data: Unsaved<ListRecord>;
    }
  | {
      table: 'list_items';
      data: Unsaved<ListItemRecord>;
    }
);

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
