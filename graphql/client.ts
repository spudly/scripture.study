import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";

const client = new ApolloClient({
  uri: "/api/graphql",
  fetch
});

export default client;
