import React from "react";
import { NextPage } from "next";
import {
  Book,
  Chapter as $Chapter,
  Volume,
  Verse,
  Person,
} from "../../../utils/types";
import * as queries from "../../../graphql/queries";
import getClient from "../../../graphql/client";
import Chapter from "../../../components/Chapter";
import getBaseUrl from "../../../utils/getBaseUrl";

type Props = {
  volume: Volume;
  book: Book;
  chapter: $Chapter;
  prev: string | null;
  next: string | null;
  verses: Array<Verse>;
  people: Array<Person>;
};

const ChapterPage: NextPage<Props> = ({
  volume,
  book,
  chapter,
  verses,
  people,
  prev,
  next,
}) => (
  <Chapter
    volume={volume}
    book={book}
    chapter={chapter}
    verses={verses}
    people={people}
    prev={prev}
    next={next}
  />
);

ChapterPage.getInitialProps = async ({
  req,
  query: { volume: volumeRef, book: bookRef, chapter: number },
}): Promise<Props> => {
  const volumeTitle = (volumeRef as string).replace(/\./g, " ");
  const bookTitle = (bookRef as string).replace(/\./g, " ");
  const client = getClient(getBaseUrl(req));
  const chapterResult = await client.query<
    queries.GetChapter,
    queries.GetChapterVariables
  >({
    query: queries.getChapter,
    variables: { volumeTitle, bookTitle, number: Number(number) },
  });

  const {
    data: { people },
  } = await client.query<queries.GetPeople, never>({
    query: queries.getPeople,
  });

  const chapterData = chapterResult.data.chapter;

  if (!chapterData) {
    throw new Error("Missing chapter!");
  }

  const { volume, book, verses, prev, next, ...chapter } = chapterData;

  return {
    volume,
    book,
    chapter,
    verses,
    prev,
    next,
    people,
  };
};

export default ChapterPage;
