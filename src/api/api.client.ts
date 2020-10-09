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
  MutationRequestBody,
  MutationResponseBody,
  ListRecord,
  EventRecord,
  ListItemRecord,
  PlaceRecord,
  QuestionRecord,
  ThingRecord,
  ChapterRecord,
} from '../utils/types';
import getCsrfToken from '../utils/getCsrfToken';

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

export const bulkMutation = async <RECORD>(
  url: string,
  payload: MutationRequestBody<RECORD>,
): Promise<MutationResponseBody> => {
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
  getAllVolumes: (opts) =>
    fetchQuery<Array<VolumeRecord>>('getAllVolumes', opts),
  getVolumeByTitle: (title: string, opts) =>
    fetchQuery<VolumeRecord>('getVolumeByTitle', opts, title),
  getAllBooksByVolumeId: (volumeId: ID, opts) =>
    fetchQuery<Array<BookRecord>>('getAllBooksByVolumeId', opts, volumeId),
  getChapterById: (volumeId: ID, chapterId: ID, opts) =>
    fetchQuery<ChapterRecord>('getChapterById', opts, volumeId, chapterId),
  getBookById: (volumeId: ID, bookId: ID, opts) =>
    fetchQuery<BookRecord>('getBookById', opts, volumeId, bookId),
  getBookByTitle: (volumeId: ID, title: string, opts) =>
    fetchQuery<BookRecord>('getBookByTitle', opts, volumeId, title),
  getAllChaptersByBookId: (volumeId: ID, bookId: ID, opts) =>
    fetchQuery<Array<ChapterRecord>>(
      'getAllChaptersByBookId',
      opts,
      volumeId,
      bookId,
    ),
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
  getAllVersesByChapterId: (volumeId, chapterId: ID, opts) =>
    fetchQuery<Array<VerseRecord>>(
      'getAllVersesByChapterId',
      opts,
      volumeId,
      chapterId,
    ),
  queryPrevChapterUrl: (volumeId, chapterId, opts) =>
    fetchQuery<string | null>('queryPrevChapterUrl', opts, volumeId, chapterId),
  queryNextChapterUrl: (volumeId, chapterId, opts) =>
    fetchQuery<string | null>('queryNextChapterUrl', opts, volumeId, chapterId),
  getAllPeople: (opts) => fetchQuery<Array<PersonRecord>>('getAllPeople', opts),
  getAllMarksByChapterId: (volumeId, chapterId, opts) =>
    fetchQuery<Array<MarkRecord>>(
      'getAllMarksByChapterId',
      opts,
      volumeId,
      chapterId,
    ),
  getUserById: () => {
    throw new Error('not implemented');
  },
  getUserRolesById: () => {
    throw new Error('not implemented');
  },
};

const buildCreateMutation = <RECORD>(url: string) => async (
  record: Unsaved<RECORD>,
) => {
  const result = await bulkMutation<RECORD>(url, {create: [record]});
  return result.createdIds![0];
};

const buildUpdateMutation = <RECORD>(url: string) => async (record: RECORD) => {
  await bulkMutation<RECORD>(url, {update: [record]});
};

const buildDeleteMutation = <RECORD>(url: string) => async (id: ID) => {
  await bulkMutation<RECORD>(url, {delete: [id]});
};

export const mutations: Mutations = {
  // createOrUpdateMarks: async (marks: Array<Mark>): Promise<void> =>
  //   fetchMutation('createOrUpdateMarks', marks),
  // createOrUpdateSpeaker: async (speaker: NewSpeaker): Promise<void> =>
  //   fetchMutation('createOrUpdateSpeaker', speaker),

  createAnswer: buildCreateMutation<AnswerRecord>('/api/answers'),
  createEvent: buildCreateMutation<EventRecord>('/api/answers'),
  createList: buildCreateMutation<ListRecord>('/api/lists'),
  createListItem: buildCreateMutation<ListItemRecord>('/api/list-items'),
  createMark: buildCreateMutation<MarkRecord>('/api/marks'),
  createPerson: buildCreateMutation<PersonRecord>('/api/people'),
  createPlace: buildCreateMutation<PlaceRecord>('/api/places'),
  createQuestion: buildCreateMutation<QuestionRecord>('/api/questions'),
  createThing: buildCreateMutation<ThingRecord>('/api/things'),

  updateAnswer: buildUpdateMutation<AnswerRecord>('/api/answers'),
  updateEvent: buildUpdateMutation<EventRecord>('/api/answers'),
  updateList: buildUpdateMutation<ListRecord>('/api/lists'),
  updateListItem: buildUpdateMutation<ListItemRecord>('/api/list-items'),
  updateMark: buildUpdateMutation<MarkRecord>('/api/marks'),
  updatePerson: buildUpdateMutation<PersonRecord>('/api/people'),
  updatePlace: buildUpdateMutation<PlaceRecord>('/api/places'),
  updateQuestion: buildUpdateMutation<QuestionRecord>('/api/questions'),
  updateThing: buildUpdateMutation<ThingRecord>('/api/things'),

  deleteAnswer: buildDeleteMutation<AnswerRecord>('/api/answers'),
  deleteEvent: buildDeleteMutation<EventRecord>('/api/answers'),
  deleteList: buildDeleteMutation<ListRecord>('/api/lists'),
  deleteListItem: buildDeleteMutation<ListItemRecord>('/api/list-items'),
  deleteMark: buildDeleteMutation<MarkRecord>('/api/marks'),
  deletePerson: buildDeleteMutation<PersonRecord>('/api/people'),
  deletePlace: buildDeleteMutation<PlaceRecord>('/api/places'),
  deleteQuestion: buildDeleteMutation<QuestionRecord>('/api/questions'),
  deleteThing: buildDeleteMutation<ThingRecord>('/api/things'),

  approve: async (id: ID) => {
    const result = await bulkMutation<never>('/api/patch', {approve: [id]});
    return result.approvedIds![0];
  },

  disapprove: async (id: ID) => {
    await bulkMutation<never>('/api/patch', {disapprove: [id]});
  },
};
