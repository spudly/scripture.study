import fetchJson from '../utils/fetchJson';
import {
  Volume,
  Queries,
  Book,
  Chapter,
  Verse,
  Mark,
  Person,
  Mutations,
} from '../utils/types';

const fetchQuery = <T>(
  name: keyof Queries,
  ...args: Array<string | number>
) => {
  const pathname = `/api/query/${name}`;
  const queryString = args
    .map((arg) => `arg=${encodeURIComponent(arg)}`)
    .join('&');
  const url = `${pathname}${queryString ? '?' : ''}${queryString}`;
  return fetchJson<T>(url);
};

const fetchMutation = async <NAME extends keyof Mutations>(
  name: NAME,
  payload: Parameters<Mutations[NAME]>[0],
) => {
  const response = await fetch(`/api/mutation/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const queries: Queries = {
  getAllVolumes: () => fetchQuery<Array<Volume>>('getAllVolumes'),
  getVolumeByTitle: (title: string) =>
    fetchQuery<Volume>('getVolumeByTitle', title),
  getAllBooksByVolumeId: (volumeId: string) =>
    fetchQuery<Array<Book>>('getAllBooksByVolumeId', volumeId),
  getChapterById: (volumeId: string, chapterId: string) =>
    fetchQuery<Chapter>('getChapterById', volumeId, chapterId),
  getBookById: (volumeId: string, bookId: string) =>
    fetchQuery<Book>('getBookById', volumeId, bookId),
  getBookByTitle: (volumeId: string, title: string) =>
    fetchQuery<Book>('getBookByTitle', volumeId, title),
  getAllChaptersByBookId: (volumeId: string, bookId: string) =>
    fetchQuery<Array<Chapter>>('getAllChaptersByBookId', volumeId, bookId),
  getChapterByBookIdAndNumber: (
    volumeId: string,
    bookId: string,
    number: string | number,
  ) =>
    fetchQuery<Chapter>(
      'getChapterByBookIdAndNumber',
      volumeId,
      bookId,
      number,
    ),
  getAllVersesByChapterId: (volumeId: string, chapterId: string) =>
    fetchQuery<Array<Verse>>('getAllVersesByChapterId', volumeId, chapterId),
  queryPrevChapterUrl: (volumeId: string, chapterId: string) =>
    fetchQuery<string | null>('queryPrevChapterUrl', volumeId, chapterId),
  queryNextChapterUrl: (volumeId: string, chapterId: string) =>
    fetchQuery<string | null>('queryNextChapterUrl', volumeId, chapterId),
  getAllSpeakers: () => fetchQuery<Array<Person>>('getAllSpeakers'),
  getAllMarksByChapterId: (volumeId: string, chapterId: string) =>
    fetchQuery<Array<Mark>>('getAllMarksByChapterId', volumeId, chapterId),
  getAllMarksByVolumeId: (volumeId: string) =>
    fetchQuery<Array<Mark>>('getAllMarksByVolumeId', volumeId),
  getAllUpdatedMarksByVolumeId: (volumeId: string, since: number) =>
    fetchQuery<Array<Mark>>('getAllUpdatedMarksByVolumeId', volumeId, since),
};

export const mutations: Mutations = {
  createOrUpdateMarks: async (marks: Array<Mark>): Promise<void> =>
    fetchMutation('createOrUpdateMarks', marks),
};
