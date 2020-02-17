import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";
import { Mark } from "../../../utils/types";

const { readFile, writeFile } = fsPromises;
const marksFile = `${process.env.ROOT}/data/marks.json`;

const deleteMark = async (markId: string) => {
  const savedMarks = JSON.parse(await readFile(marksFile, "utf-8")) as Array<
    Mark
  >;
  console.log("writing file...");
  await writeFile(
    marksFile,
    JSON.stringify(savedMarks.filter(mark => mark.id !== markId))
  );
  console.log("wrote file...");
};

const handleRequest = async (req: NextApiRequest, resp: NextApiResponse) => {
  const {
    method,
    query: { id }
  } = req;
  if (method === "DELETE") {
    await deleteMark(id as string);
    resp.status(204);
    resp.end();
    return;
  }
  resp.status(404).end();
};

export default handleRequest;
