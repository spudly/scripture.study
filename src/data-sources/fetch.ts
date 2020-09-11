import fetchJson from '../utils/fetchJson';
import {
  Volume,
  Queries,
  Book,
  Chapter,
  Verse,
  Mark,
  Speaker,
  Mutations,
  NewSpeaker,
  QueryOptions,
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
  if (options.noCache) {
    // headers['Cache-Control'] = 'no-cache';
  }
  return fetchJson<T>(url, {headers});
};

const fetchMutation = async <NAME extends keyof Mutations>(
  name: NAME,
  payload: Parameters<Mutations[NAME]>[0],
) => {
  const response = await fetch(`/api/mutation/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line no-restricted-globals
      'CSRF-Token': getCsrfToken(),
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const queries: Queries = {
  getAllVolumes: (opts) => fetchQuery<Array<Volume>>('getAllVolumes', opts),
  getVolumeByTitle: (title: string, opts) =>
    fetchQuery<Volume>('getVolumeByTitle', opts, title),
  getAllBooksByVolumeId: (volumeId: string, opts) =>
    fetchQuery<Array<Book>>('getAllBooksByVolumeId', opts, volumeId),
  getChapterById: (volumeId: string, chapterId: string, opts) =>
    fetchQuery<Chapter>('getChapterById', opts, volumeId, chapterId),
  getBookById: (volumeId: string, bookId: string, opts) =>
    fetchQuery<Book>('getBookById', opts, volumeId, bookId),
  getBookByTitle: (volumeId: string, title: string, opts) =>
    fetchQuery<Book>('getBookByTitle', opts, volumeId, title),
  getAllChaptersByBookId: (volumeId: string, bookId: string, opts) =>
    fetchQuery<Array<Chapter>>(
      'getAllChaptersByBookId',
      opts,
      volumeId,
      bookId,
    ),
  getChapterByBookIdAndNumber: (
    volumeId: string,
    bookId: string,
    number: string | number,
    opts,
  ) =>
    fetchQuery<Chapter>(
      'getChapterByBookIdAndNumber',
      opts,
      volumeId,
      bookId,
      number,
    ),
  getAllVersesByChapterId: (volumeId, chapterId: string, opts) =>
    fetchQuery<Array<Verse>>(
      'getAllVersesByChapterId',
      opts,
      volumeId,
      chapterId,
    ),
  queryPrevChapterUrl: (volumeId, chapterId, opts) =>
    fetchQuery<string | null>('queryPrevChapterUrl', opts, volumeId, chapterId),
  queryNextChapterUrl: (volumeId, chapterId, opts) =>
    fetchQuery<string | null>('queryNextChapterUrl', opts, volumeId, chapterId),
  getAllSpeakers: (opts) => fetchQuery<Array<Speaker>>('getAllSpeakers', opts),
  getAllMarksByChapterId: (volumeId, chapterId, opts) =>
    fetchQuery<Array<Mark>>(
      'getAllMarksByChapterId',
      opts,
      volumeId,
      chapterId,
    ),
  getAllMarksByVolumeId: (volumeId, opts) =>
    fetchQuery<Array<Mark>>('getAllMarksByVolumeId', opts, volumeId),
  getAllUpdatedMarksByVolumeId: (volumeId, since, opts) =>
    fetchQuery<Array<Mark>>(
      'getAllUpdatedMarksByVolumeId',
      opts,
      volumeId,
      since,
    ),
};

export const mutations: Mutations = {
  createOrUpdateMarks: async (marks: Array<Mark>): Promise<void> =>
    fetchMutation('createOrUpdateMarks', marks),
  createOrUpdateSpeaker: async (speaker: NewSpeaker): Promise<void> =>
    fetchMutation('createOrUpdateSpeaker', speaker),
};
