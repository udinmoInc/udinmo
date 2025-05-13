import { GraphQLSchema } from 'graphql';
import query from './resolvers/query/query';
import mutation from './resolvers/mutations/mutation';

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
