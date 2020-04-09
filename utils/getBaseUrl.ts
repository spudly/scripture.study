import { IncomingMessage } from "http";

const getBaseUrl = (req?: IncomingMessage) => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return `${req?.headers["x-forwarded-proto"]}://${req?.headers["x-forwarded-host"]}`;
};

export default getBaseUrl;
