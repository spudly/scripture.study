import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";

const getClient = (baseUrl = "") =>
  new ApolloClient({
    uri: `${baseUrl}/api/graphql`,
    fetch,
  });

export default getClient;
