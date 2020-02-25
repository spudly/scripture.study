import { ApolloServer } from "apollo-server-micro";
import getDataSources from "../../graphql/dataSources";
import typeDefs from "../../graphql/typeDefs";
import resolvers from "../../graphql/resolvers";
import getConnection from "../../db/getConnection";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: getDataSources,
  context: async () => {
    return { db: await getConnection() };
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({ path: "/api/graphql" });
