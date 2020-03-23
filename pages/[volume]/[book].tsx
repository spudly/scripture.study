import React from "react";
import { NextPage } from "next";
import { Book, Chapter, Volume } from "../../utils/types";
import * as queries from "../../graphql/queries";
import client from "../../graphql/client";
import byNumber from "../../utils/byNumber";
import Directory from "../../components/Directory";

const BookPage: NextPage<{
  volume: Volume;
  book: Book;
  chapters: Array<Chapter>;
}> = ({ volume, book, chapters }) => (
  <Directory
    small
    entries={chapters.sort(byNumber).map(chapter => ({
      id: chapter.id,
      href: `/${volume.title.replace(/\s/g, ".")}/${book.title.replace(
        /\s/g,
        "."
      )}/${chapter.number}`,
      title: String(chapter.number)
    }))}
  />
);

BookPage.getInitialProps = async ({
  query: { volume: volumeRef, book: bookRef }
}) => {
  const volumeTitle = (volumeRef as string).replace(/\./g, " ");
  const bookTitle = (bookRef as string).replace(/\./g, " ");
  const result = await client.query({
    query: queries.getBook,
    variables: { volumeTitle, bookTitle }
  });

  const { volume, chapters, ...book } = result.data.book;

  return {
    volume,
    book,
    chapters
  };
};

export default BookPage;
