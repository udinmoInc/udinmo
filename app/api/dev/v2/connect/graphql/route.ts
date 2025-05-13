import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {
  ApolloServerPluginSchemaReportingDisabled,
  ApolloServerPluginUsageReportingDisabled,
} from '@apollo/server/plugin/disabled';

import { NextRequest, NextResponse } from 'next/server';
import { createContext } from './context';
import { RouteMiddleware } from '@/lib/graphql/routeMiddleware';
import schema from '@/graphql/schema/schema';
import { performAstCodegen } from '@/graphql/codegen';

const errorStatusPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response, errors }) {
        if (errors?.length) {
          const httpStatus = (errors[0].extensions?.http as { status?: number })?.status;
          if (httpStatus && response.http) {
            response.http.status = httpStatus;
          }
        }
      },
    };
  },
};

performAstCodegen();

const server = new ApolloServer({
  schema,

  plugins: [
    errorStatusPlugin,
    ApolloServerPluginSchemaReportingDisabled(),
    ApolloServerPluginUsageReportingDisabled(),
  ],
  formatError: (err) => {
    const http = err.extensions?.http as { status?: number };
    return {
      message: err.message,
      code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
      status: http?.status,
      ErrorCode: err.extensions?.ErrorCode || 'UNKNOWN',
    };
  },
});


const apolloHandler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => createContext(req),
});


async function routeHandler(req: NextRequest) {
  const middlewareResponse = await RouteMiddleware(req);
  if (middlewareResponse instanceof NextResponse) {
    return middlewareResponse;
  }

  return apolloHandler(req);
}


export const GET = routeHandler;
export const POST = routeHandler;
export const OPTIONS = routeHandler;
