export type ID = string;

export type RoleName = 'admin' | 'moderator' | 'author';

export type EditableRecord = {
  id: ID;
  lastUpdatedBy: string;
  lastUpdatedDate: number;
  approvedBy: string;
  approvedDate: number;
};

export type Unsaved<RECORD> = Omit<RECORD, 'id' | keyof EditableRecord>;

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

export type UserWithRoles = UserRecord & {roles: Array<RoleName>};

export type MarkRecordPlus = MarkRecord & {
  verse: VerseRecord & {
    chapter: ChapterRecord & {
      book: BookRecord & {
        volume: VolumeRecord;
      };
    };
  };
};
