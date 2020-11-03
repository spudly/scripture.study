import fetchJson from '../utils/fetchJson';
import {
  BookRecord,
  BulkMutationRequestBody,
  BulkMutationResponseBody,
  ChapterRecord,
  GetAllResponseBody,
  ID,
  MarkRecord,
  PersonLinkRecord,
  PersonRecord,
  Unsaved,
  VerseRecord,
  VolumeRecord,
} from '../types';

export const bulkMutation = <RECORD>(
  url: string,
  payload: BulkMutationRequestBody<RECORD>,
): Promise<BulkMutationResponseBody<RECORD>> =>
  fetchJson<BulkMutationResponseBody<RECORD>>(url, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

export const getAllVolumes = () =>
  fetchJson<GetAllResponseBody<VolumeRecord>>('/api/volumes');

export const getVolumeByTitle = async (
  title: string,
): Promise<VolumeRecord | undefined> => {
  const {
    items: [volume],
  } = await fetchJson<GetAllResponseBody<VolumeRecord>>(
    `/api/volumes?title=${encodeURIComponent(title)}`,
  );
  return volume;
};

export const getAllBooksByVolumeId = (volumeId: ID) =>
  fetchJson<GetAllResponseBody<BookRecord>>(`/api/books?volumeId=${volumeId}`);

export const getBookByVolumeIdAndTitle = async (
  volumeId: ID,
  title: string,
) => {
  const {
    items: [book],
  } = await fetchJson<GetAllResponseBody<BookRecord>>(
    `/api/books?volumeId=${encodeURIComponent(
      volumeId,
    )}&title=${encodeURIComponent(title)}`,
  );
  return book;
};

export const getAllChaptersByBookId = (bookId: ID) =>
  fetchJson<GetAllResponseBody<ChapterRecord>>(
    `/api/chapters?bookId=${bookId}`,
  );

export const getChapterByBookIdAndNumber = async (
  bookId: ID,
  number: number,
) => {
  const {
    items: [chapter],
  } = await fetchJson<GetAllResponseBody<ChapterRecord>>(
    `/api/chapters?bookId=${encodeURIComponent(
      bookId,
    )}&number=${encodeURIComponent(number)}`,
  );
  return chapter;
};

export const getAllVersesByChapterId = (chapterId: ID) =>
  fetchJson<GetAllResponseBody<VerseRecord>>(
    `/api/verses?chapterId=${encodeURIComponent(chapterId)}`,
  );

export const getAdjacentChapters = (chapterId: ID) =>
  fetchJson<{
    prev: {
      volume: VolumeRecord;
      book: BookRecord;
      chapter: ChapterRecord;
    } | null;
    next: {
      volume: VolumeRecord;
      book: BookRecord;
      chapter: ChapterRecord;
    } | null;
  }>(`/api/chapters/${encodeURIComponent(chapterId)}/adjacent`);

export const getAllPeople = () =>
  fetchJson<GetAllResponseBody<PersonRecord>>('/api/people');

export const getAllMarksByChapterId = (chapterId: ID) =>
  fetchJson<Array<MarkRecord>>(
    `/api/marks/byChapterId/${encodeURIComponent(chapterId)}`,
  );

export const createPerson = (person: Unsaved<PersonRecord>) =>
  fetchJson<PersonRecord>('/api/people', {
    body: JSON.stringify(person),
    method: 'POST',
  });

export const createPersonLink = (personLink: Unsaved<PersonLinkRecord>) =>
  fetchJson<PersonLinkRecord>('/api/people-links', {
    body: JSON.stringify(personLink),
    method: 'POST',
  });

export const updatePerson = async (person: PersonRecord) =>
  await fetchJson<PersonRecord>(`/api/people/${person.id}`, {
    body: JSON.stringify(person),
    method: 'PUT',
  });

export const updatePersonLink = async (personLink: PersonLinkRecord) =>
  await fetchJson<PersonLinkRecord>(`/api/people-links/${personLink.id}`, {
    body: JSON.stringify(personLink),
    method: 'PUT',
  });

export const deletePersonLink = async ({id}: {id: ID}) =>
  await fetchJson<ID>(`/api/people-links/${id}`, {
    method: 'DELETE',
  });
