import { NextApiRequest, NextApiResponse } from "next";
import getAllBooks from "../../utils/getAllBooks";

const getBooksResponse = () => ({
  type: "books",
  books: getAllBooks()
});

const handleRequest = (req: NextApiRequest, resp: NextApiResponse) => {
  const {
    method,
    query: { ref }
  } = req;
  if (method === "GET") {
    resp.status(200);
    resp.setHeader("Content-Type", "application/json");
    resp.send(JSON.stringify(getBooksResponse()));
    return;
  }
  resp.status(500).end();
};

export default handleRequest;
