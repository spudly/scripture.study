import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";
import { Mark } from "../../utils/types";

const { readFile, writeFile } = fsPromises;
const marksFile = `${process.env.ROOT}/data/marks.json`;

const addMarks = async (marks: Array<Mark>) => {
  const savedMarks = JSON.parse(await readFile(marksFile, "utf-8"));
  await writeFile(marksFile, JSON.stringify([...savedMarks, ...marks]));
};

const handleRequest = async (req: NextApiRequest, resp: NextApiResponse) => {
  const { method, body } = req;
  if (method === "POST") {
    try {
      await addMarks(body as Array<Mark>);
    } catch (error) {
      resp.status(500).send(error.stack);
      return;
    }
    resp.status(204);
    resp.end();
    return;
  }
  resp.status(500).end();
};

export default handleRequest;
