import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';


const CreateWorkspaceInputType = new GraphQLInputObjectType({
  name: 'CreateWorkspaceInput',
  description: 'Input type for creating a new workspace',
  fields: () => ({
    workspaceOwner: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name or identifier of the workspace owner',
    },
    ownerId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'UUID of the workspace owner (user who owns the workspace)',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title or name of the workspace',
    },
    iconId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Icon identifier for UI display',
    },
    data: {
      type: GraphQLString,
      description: 'Optional JSON string storing workspace metadata or config',
    },
    inTrash: {
      type: GraphQLBoolean,
      description: 'Indicates whether the workspace is in the trash (default: false)',
    },
    logo: {
      type: GraphQLString,
      description: 'Optional logo image URL for the workspace',
    },
    bannerUrl: {
      type: GraphQLString,
      description: 'Optional banner image URL for the workspace',
    },
  }),
});

export default CreateWorkspaceInputType;
