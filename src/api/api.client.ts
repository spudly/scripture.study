import fetchJson from '../utils/fetchJson';
import {
  Queries,
  Mutations,
  QueryOptions,
  VolumeRecord,
  BookRecord,
  ID,
  VerseRecord,
  PersonRecord,
  MarkRecord,
  Unsaved,
  AnswerRecord,
  BulkMutationRequestBody,
  BulkMutationResponseBody,
  ListRecord,
  EventRecord,
  ListItemRecord,
  PlaceRecord,
  QuestionRecord,
  ThingRecord,
  ChapterRecord,
  PersonLinkRecord,
} from '../utils/types';
import getCsrfToken from '../utils/getCsrfToken';

/** @deprecated */
const fetchQuery = <T>(
  name: keyof Queries,
  options: QueryOptions = {},
  ...args: Array<string | number>
) => {
  const pathname = `/api/query/${name}`;
  const queryString = args
    .map((arg) => `arg=${encodeURIComponent(arg)}`)
    .join('&');
  const url = `${pathname}${queryString ? '?' : ''}${queryString}`;
  const headers: RequestInit['headers'] = {};
  return fetchJson<T>(url, {headers});
};

/** @deprecated */
export const bulkMutation = async <RECORD>(
  url: string,
  payload: BulkMutationRequestBody<RECORD>,
): Promise<BulkMutationResponseBody> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': getCsrfToken(),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const queries: Queries = {
  /** @deprecated */
  getAllVolumes: (opts) =>
    fetchQuery<Array<VolumeRecord>>('getAllVolumes', opts),
  /** @deprecated */
  getVolumeByTitle: (title: string, opts) =>
    fetchQuery<VolumeRecord>('getVolumeByTitle', opts, title),
  /** @deprecated */
  getAllBooksByVolumeId: (volumeId: ID, opts) =>
    fetchQuery<Array<BookRecord>>('getAllBooksByVolumeId', opts, volumeId),
  /** @deprecated */
  getChapterById: (volumeId: ID, chapterId: ID, opts) =>
    fetchQuery<ChapterRecord>('getChapterById', opts, volumeId, chapterId),
  /** @deprecated */
  getBookById: (volumeId: ID, bookId: ID, opts) =>
    fetchQuery<BookRecord>('getBookById', opts, volumeId, bookId),
  /** @deprecated */
  getBookByTitle: (volumeId: ID, title: string, opts) =>
    fetchQuery<BookRecord>('getBookByTitle', opts, volumeId, title),
  /** @deprecated */
  getAllChaptersByBookId: (volumeId: ID, bookId: ID, opts) =>
    fetchQuery<Array<ChapterRecord>>(
      'getAllChaptersByBookId',
      opts,
      volumeId,
      bookId,
    ),
  /** @deprecated */
  getChapterByBookIdAndNumber: (
    volumeId: ID,
    bookId: ID,
    number: string | number,
    opts,
  ) =>
    fetchQuery<ChapterRecord>(
      'getChapterByBookIdAndNumber',
      opts,
      volumeId,
      bookId,
      number,
    ),
  /** @deprecated */
  getAllVersesByChapterId: (volumeId, chapterId: ID, opts) =>
    fetchQuery<Array<VerseRecord>>(
      'getAllVersesByChapterId',
      opts,
      volumeId,
      chapterId,
    ),
  /** @deprecated */
  queryPrevChapterUrl: (volumeId, chapterId, opts) =>
    fetchQuery<string | null>('queryPrevChapterUrl', opts, volumeId, chapterId),
  /** @deprecated */
  queryNextChapterUrl: (volumeId, chapterId, opts) =>
    fetchQuery<string | null>('queryNextChapterUrl', opts, volumeId, chapterId),
  /** @deprecated */
  getAllPeople: (opts) => fetchQuery<Array<PersonRecord>>('getAllPeople', opts),
  /** @deprecated */
  getAllMarksByChapterId: (volumeId, chapterId, opts) =>
    fetchQuery<Array<MarkRecord>>(
      'getAllMarksByChapterId',
      opts,
      volumeId,
      chapterId,
    ),
  /** @deprecated */
  getUserById: () => {
    throw new Error('not implemented');
  },
  /** @deprecated */
  getUserRolesById: () => {
    throw new Error('not implemented');
  },
};

/** @deprecated */
const buildCreateMutation = <RECORD>(url: string) => async (
  record: Unsaved<RECORD>,
) => {
  const result = await bulkMutation<RECORD>(url, {create: [record]});
  return result.createdIds![0];
};

/** @deprecated */
const buildUpdateMutation = <RECORD>(url: string) => async (record: RECORD) => {
  await bulkMutation<RECORD>(url, {update: [record]});
};

/** @deprecated */
const buildDeleteMutation = <RECORD>(url: string) => async (id: ID) => {
  await bulkMutation<RECORD>(url, {delete: [id]});
};

export const mutations: Mutations = {
  // createOrUpdateMarks: async (marks: Array<Mark>): Promise<void> =>
  //   fetchMutation('createOrUpdateMarks', marks),
  // createOrUpdateSpeaker: async (speaker: NewSpeaker): Promise<void> =>
  //   fetchMutation('createOrUpdateSpeaker', speaker),

  /** @deprecated */
  createAnswer: buildCreateMutation<AnswerRecord>('/api/answers'),
  /** @deprecated */
  createEvent: buildCreateMutation<EventRecord>('/api/answers'),
  /** @deprecated */
  createList: buildCreateMutation<ListRecord>('/api/lists'),
  /** @deprecated */
  createListItem: buildCreateMutation<ListItemRecord>('/api/list-items'),
  /** @deprecated */
  createMark: buildCreateMutation<MarkRecord>('/api/marks'),
  /** @deprecated */
  createPerson: buildCreateMutation<PersonRecord>('/api/people'),
  /** @deprecated */
  createPersonLink: buildCreateMutation<PersonLinkRecord>('/api/people-links'),
  createPlace: buildCreateMutation<PlaceRecord>('/api/places'),
  /** @deprecated */
  createQuestion: buildCreateMutation<QuestionRecord>('/api/questions'),
  /** @deprecated */
  createThing: buildCreateMutation<ThingRecord>('/api/things'),

  /** @deprecated */
  updateAnswer: buildUpdateMutation<AnswerRecord>('/api/answers'),
  /** @deprecated */
  updateEvent: buildUpdateMutation<EventRecord>('/api/answers'),
  /** @deprecated */
  updateList: buildUpdateMutation<ListRecord>('/api/lists'),
  /** @deprecated */
  updateListItem: buildUpdateMutation<ListItemRecord>('/api/list-items'),
  /** @deprecated */
  updateMark: buildUpdateMutation<MarkRecord>('/api/marks'),
  /** @deprecated */
  updatePerson: buildUpdateMutation<PersonRecord>('/api/people'),
  /** @deprecated */
  updatePersonLink: buildUpdateMutation<PersonLinkRecord>('/api/people-links'),
  /** @deprecated */
  updatePlace: buildUpdateMutation<PlaceRecord>('/api/places'),
  /** @deprecated */
  updateQuestion: buildUpdateMutation<QuestionRecord>('/api/questions'),
  /** @deprecated */
  updateThing: buildUpdateMutation<ThingRecord>('/api/things'),

  /** @deprecated */
  deleteAnswer: buildDeleteMutation<AnswerRecord>('/api/answers'),
  /** @deprecated */
  deleteEvent: buildDeleteMutation<EventRecord>('/api/answers'),
  /** @deprecated */
  deleteList: buildDeleteMutation<ListRecord>('/api/lists'),
  /** @deprecated */
  deleteListItem: buildDeleteMutation<ListItemRecord>('/api/list-items'),
  /** @deprecated */
  deleteMark: buildDeleteMutation<MarkRecord>('/api/marks'),
  /** @deprecated */
  deletePerson: buildDeleteMutation<PersonRecord>('/api/people'),
  /** @deprecated */
  deletePersonLink: buildDeleteMutation<PersonLinkRecord>('/api/people-links'),
  /** @deprecated */
  deletePlace: buildDeleteMutation<PlaceRecord>('/api/places'),
  /** @deprecated */
  deleteQuestion: buildDeleteMutation<QuestionRecord>('/api/questions'),
  /** @deprecated */
  deleteThing: buildDeleteMutation<ThingRecord>('/api/things'),
};
