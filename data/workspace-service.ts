import prisma from "@/graphql/prisma/client";
import { Workspace } from "@/lib/generated/prisma";


export const workspace = async (): Promise<Workspace[]> => {
  return prisma.workspace.findMany();
};

interface CreateWorkspaceInput {
  title: string;
  iconId: string;
  workspaceOwner: string;
  ownerId: string;
  data?: string;
  inTrash?: boolean;
  logo?: string;
  bannerUrl?: string;
}

export const createWorkspace = async ({
  title,
  iconId,
  workspaceOwner,
  ownerId,
  data,
  inTrash = false,
  logo,
  bannerUrl,
}: CreateWorkspaceInput): Promise<Workspace> => {

  return prisma.workspace.create({
    data: {
      title,
      iconId,
      workspaceOwner,
      ownerId,  
      data,
      inTrash,
      logo,
      bannerUrl,
    },
  });
};
