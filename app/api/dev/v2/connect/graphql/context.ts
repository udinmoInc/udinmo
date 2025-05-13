import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { GraphQLError } from 'graphql';
import { PrismaClient } from "@/lib/generated/prisma"; // Prisma import

// Create a Prisma client instance
const prisma = new PrismaClient();

// Define the context type
export interface IApolloServerContext {
  prisma: PrismaClient;
  user?: any; // Assuming `user` can be of any type or define a specific type for the user
}

export async function createContext(req: NextRequest): Promise<IApolloServerContext> {
  // Skip authentication if DISABLE_AUTH is true
  if (process.env.DISABLE_AUTH === 'true') {
    return { prisma }; // Return only prisma if no authentication is needed
  }

  // Initialize Supabase client
  const supabase = await createClient();
  
  // Fetch user information from Supabase auth
  const { data: { user }, error } = await supabase.auth.getUser();

  // If there's an error or no user, throw an Unauthorized error
  if (error || !user) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHORIZED_ACCESS",
        http: { status: 401 },
        ErrorCode: "401",
      }
    });
  }

  // Return the context with Prisma and the user
  return { prisma, user };
}
