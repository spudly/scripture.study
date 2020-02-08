import { NextApiRequest, NextApiResponse } from "next";
import getVolumes from "../../../utils/getVolumes";
import getBooks from "../../../utils/getBooks";
import getChapters from "../../../utils/getChapters";
import getVerses from "../../../utils/getVerses";
import getVerse from "../../../utils/getVerse";

const getResponseBody = ([vol, book, chapter, verse]: Array<string>) => {
  if (!book) {
    return getBooks(vol);
  }
  if (!chapter) {
    return getChapters(vol, book);
  }
  if (!verse) {
    return getVerses(vol, book, chapter);
  }
  return getVerse(vol, book, chapter, verse);
};

const handleRequest = (req: NextApiRequest, resp: NextApiResponse) => {
  const {
    method,
    query: { tokens }
  } = req;
  console.log(tokens);
  if (method === "GET") {
    let body;
    try {
      body = getResponseBody(tokens as Array<string>);
    } catch (error) {
      resp.status(500).end();
      return;
    }
    resp.status(200);
    resp.setHeader("Content-Type", "application/json");
    resp.send(JSON.stringify(body));
    return;
  }
  resp.status(500).end();
};

export default handleRequest;
