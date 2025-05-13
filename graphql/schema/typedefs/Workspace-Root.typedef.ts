import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql';


const WorkspaceType = new GraphQLObjectType({
  name: 'Workspace',
  description: 'A workspace object containing user-managed project data',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique identifier for the workspace',
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Timestamp of when the workspace was created',
    },
    workspaceOwner: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name or identifier of the workspace owner',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title or name of the workspace',
    },
    iconId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Icon identifier used for UI display',
    },
    data: {
      type: GraphQLString,
      description: 'Optional JSON string storing workspace metadata or configuration',
    },
    inTrash: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Indicates whether the workspace is marked as trash',
    },
    logo: {
      type: GraphQLString,
      description: 'Optional logo image URL associated with the workspace',
    },
    bannerUrl: {
      type: GraphQLString,
      description: 'Optional banner image URL for the workspace',
    },
    ownerId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'UUID of the user who created or owns the workspace',
    },
  }),
});

export default WorkspaceType;
