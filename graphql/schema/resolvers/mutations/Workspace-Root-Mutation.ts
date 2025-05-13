import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLNonNull,
} from 'graphql';
import { Workspace } from '@/lib/generated/prisma';
import { IApolloServerContext } from '@/app/api/dev/v2/connect/graphql/context';
import { createWorkspace } from '@/data/workspace-service';
import WorkspaceType from '../../typedefs/Workspace-Root.typedef';
import CreateWorkspaceInputType from '../../typedefs/Mu-Workspace-Root.Typedef';


export const createWorkspaceMutationResolver: GraphQLFieldResolver<
  unknown,
  IApolloServerContext
> = async (
  _source,
  {
    input: {
      title,
      iconId,
      workspaceOwner,
      ownerId,
      data,
      inTrash,
      logo,
      bannerUrl,
    },
  },
  context
): Promise<Workspace> => {
  const user = context.user;


  if (!user?.email) {
    throw new Error('Authentication required to create a workspace.');
  }


  return createWorkspace({
    title,
    iconId,
    workspaceOwner,
    ownerId,
    data,
    inTrash: inTrash ?? false,
    logo,
    bannerUrl,
  });
};


const createWorkspaceMutation: GraphQLFieldConfig<
  unknown,
  IApolloServerContext
> = {
  description: 'Create a new workspace',
  type: new GraphQLNonNull(WorkspaceType),
  args: {
    input: {
      type: new GraphQLNonNull(CreateWorkspaceInputType),
    },
  },
  resolve: createWorkspaceMutationResolver,
};

export default createWorkspaceMutation;
