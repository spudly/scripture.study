import { NextApiRequest, NextApiResponse } from "next";
import getVersesByReference from "../../../utils/getVersesByReference";

const handleRequest = (req: NextApiRequest, resp: NextApiResponse) => {
  const {
    method,
    query: { ref }
  } = req;
  if (method === "GET") {
    const verses = getVersesByReference(ref as string);
    if (verses.length) {
      resp.status(200);
      resp.setHeader("Content-Type", "application/json");
      resp.send(JSON.stringify(verses));
    } else {
      resp.status(404);
      resp.end();
    }
    return;
  }
  resp.status(500).end();
};

export default handleRequest;
