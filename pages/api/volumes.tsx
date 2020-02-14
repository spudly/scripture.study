import { NextApiRequest, NextApiResponse } from "next";
import getAllVolumes from "../../utils/getAllVolumes";

const getVolumesResponse = () => ({
  type: "volumes",
  volumes: getAllVolumes()
});

const handleRequest = (req: NextApiRequest, resp: NextApiResponse) => {
  const { method } = req;
  if (method === "GET") {
    resp.status(200);
    resp.setHeader("Content-Type", "application/json");
    resp.send(JSON.stringify(getVolumesResponse()));
    return;
  }
  resp.status(500).end();
};

export default handleRequest;
