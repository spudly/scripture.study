import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";

const client = new ApolloClient({
  uri: `${
    typeof window !== undefined
      ? `http://localhost:${process.env.PORT ?? 3000}`
      : ""
  }/api/graphql`,
  fetch,
});

export default client;
