import { NextApiRequest, NextApiResponse } from "next";
import getVolumes from "../../utils/getVolumes";

const handleRequest = (req: NextApiRequest, resp: NextApiResponse) => {
  const {
    method,
    query: { tokens }
  } = req;
  if (method === "GET") {
    let body;
    try {
      body = getVolumes();
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
