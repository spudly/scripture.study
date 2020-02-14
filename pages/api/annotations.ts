import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";
import { Annotation } from "../../utils/types";

const { readFile, writeFile } = fsPromises;
const annotationsFile = `${process.env.ROOT}/data/annotations.json`;

const addAnnotations = async (annotations: Array<Annotation>) => {
  const savedAnnotations = JSON.parse(await readFile(annotationsFile, "utf-8"));
  await writeFile(
    annotationsFile,
    JSON.stringify([...savedAnnotations, ...annotations])
  );
};

const handleRequest = async (req: NextApiRequest, resp: NextApiResponse) => {
  const { method, body } = req;
  if (method === "POST") {
    try {
      await addAnnotations(body as Array<Annotation>);
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
