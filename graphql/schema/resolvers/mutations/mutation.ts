import { GraphQLObjectType } from 'graphql';
import createWorkspaceMutation from './Workspace-Root-Mutation';

const mutation = new GraphQLObjectType({
  name: 'RootMutationType', 
  fields: {
    CreateWorkspace: createWorkspaceMutation,
  },
});

export default mutation;
