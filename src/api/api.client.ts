import fetchJson from '../utils/fetchJson';
import {
  VolumeRecord,
  BookRecord,
  ID,
  VerseRecord,
  PersonRecord,
  MarkRecord,
  Unsaved,
  BulkMutationRequestBody,
  BulkMutationResponseBody,
  ChapterRecord,
  PersonLinkRecord,
  GetAllResponseBody,
} from '../utils/types';

export const bulkMutation = <RECORD>(
  url: string,
  payload: BulkMutationRequestBody<RECORD>,
): Promise<BulkMutationResponseBody<RECORD>> =>
  fetchJson<BulkMutationResponseBody<RECORD>>(url, {
    method: 'POST',
    body: JSON.stringify(payload),
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
  fetchJson<GetAllResponseBody<MarkRecord>>(
    `/api/marks/byChapterId/${encodeURIComponent(chapterId)}`,
  );

export const createPerson = (person: Unsaved<PersonRecord>) =>
  fetchJson<PersonRecord>('/api/people', {
    method: 'POST',
    body: JSON.stringify(person),
  });

export const createPersonLink = (personLink: Unsaved<PersonLinkRecord>) =>
  fetchJson<PersonLinkRecord>('/api/people-links', {
    method: 'POST',
    body: JSON.stringify(personLink),
  });

export const updatePerson = async (person: PersonRecord) =>
  fetchJson<PersonRecord>(`/api/people/${person.id}`, {
    method: 'PUT',
    body: JSON.stringify(person),
  });

export const updatePersonLink = async (personLink: PersonLinkRecord) =>
  fetchJson<PersonLinkRecord>(`/api/people-links/${personLink.id}`, {
    method: 'PUT',
    body: JSON.stringify(personLink),
  });
