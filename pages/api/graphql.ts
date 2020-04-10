import {ApolloServer} from 'apollo-server-micro';
import 'graphql-import-node/register';
import typeDefs from '../../graphql/schema.graphql';
import resolvers from '../../graphql/resolvers';
import getConnection from '../../db/getConnection';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const db = await getConnection();
    return {db};
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({path: '/api/graphql'});
