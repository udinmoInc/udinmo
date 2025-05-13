import { GraphQLList } from 'graphql';
import WorkspaceType from '../../typedefs/Workspace-Root.typedef';
import { IApolloServerContext } from '@/app/api/dev/v2/connect/graphql/context';
import { Workspace } from '@/lib/generated/prisma';
import { workspace } from '@/data/workspace-service';

const getWorkspacesQuery = {
  type: new GraphQLList(WorkspaceType),
  description: 'Fetch all available workspaces from the database',

  resolve: async (
    _source: unknown,
    _args: unknown,
    _context: IApolloServerContext
  ): Promise<Workspace[]> => {
    try {
      const workspaces = await workspace(); 
      return workspaces;
    } catch (error) {
      
      throw new Error('Failed to fetch workspaces');
    }
  },
};

export default getWorkspacesQuery;
