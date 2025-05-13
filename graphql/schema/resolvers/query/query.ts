
import { GraphQLObjectType } from 'graphql';
import getWorkspacesQuery from './Workspace-Root-Query';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    workspaces: getWorkspacesQuery,  
  },
});

export default query;
