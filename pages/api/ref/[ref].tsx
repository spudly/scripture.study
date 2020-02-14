import { NextApiRequest, NextApiResponse } from "next";
import getAllVolumes from "../../../utils/getAllVolumes";
import getAllBooks from "../../../utils/getAllBooks";
import parseReference from "../../../utils/parseReference";
import getVerses from "../../../utils/getVerses";
import normalize from "../../../utils/normalize";
import getAdjecentChapters from "../../../utils/getAdjacentChapters";
import getAdjacentVerses from "../../../utils/getAdjacentVerses";
import { ApiResponse } from "../../../utils/types";

const getVolumesResponse = (ref: string): ApiResponse | null => {
  if (ref === "volumes") {
    return { type: "volumes", volumes: getAllVolumes() };
  }
  return null;
};

const getVolumeResponse = (ref: string): ApiResponse | null => {
  const volume = getAllVolumes().find(
    v => normalize(v.title) === normalize(ref)
  );
  if (volume) {
    return { type: "volume", volume };
  }
  return null;
};

const getBookResponse = (ref: string): ApiResponse | null => {
  const book = getAllBooks().find(b => normalize(b.title) === normalize(ref));
  if (book) {
    return { type: "book", book };
  }
  return null;
};

const getChapterResponse = (ref: string): ApiResponse | null => {
  const references = parseReference(ref);
  if (references.length === 1) {
    const [{ book, chapter, verses }] = references;
    if (book && chapter && !verses) {
      const [prev, next] = getAdjecentChapters(book.title, chapter.number);
      return {
        type: "chapter",
        verses: getVerses(
          v =>
            v.book_title === book.title && v.chapter_number === chapter.number
        ),
        prev,
        next
      };
    }
  }
  return null;
};

const getAdhocVersesResponse = (ref: string): ApiResponse | null => {
  const verses = parseReference(ref).flatMap(
    ({ book, chapter, verses }) =>
      verses ??
      getVerses(
        v =>
          String(v.book_id) === book.id && String(v.chapter_id) === chapter.id
      )
  );
  if (verses.length === 1) {
    const [verse] = verses;
    const [prev, next] = getAdjacentVerses(
      verse.bookTitle,
      verse.chapter,
      verse.number
    );
    return {
      type: "verse",
      verse,
      prev,
      next
    };
  }
  return {
    type: "verses",
    verses
  };
};

const getResponse = (ref: string): ApiResponse | null => {
  return (
    getVolumesResponse(ref) ||
    getVolumeResponse(ref) ||
    getBookResponse(ref) ||
    getChapterResponse(ref) ||
    getAdhocVersesResponse(ref)
  );
};

const handleRequest = (req: NextApiRequest, resp: NextApiResponse) => {
  const {
    method,
    query: { ref }
  } = req;
  if (method === "GET") {
    if (ref === "favicon.ico") {
      resp.status(404).end();
      return;
    }
    resp.status(200);
    resp.setHeader("Content-Type", "application/json");
    resp.send(JSON.stringify(getResponse(ref as string)));
    return;
  }
  resp.status(500).end();
};

export default handleRequest;
