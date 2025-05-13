
import * as fs from 'fs';
import * as path from 'path';
import { parse, printSchema } from 'graphql';
import { Types } from '@graphql-codegen/plugin-helpers';
import { codegen } from '@graphql-codegen/core';
import * as schemaAstPlugin from '@graphql-codegen/schema-ast';
import schema from '@/graphql/schema/schema';
import prisma from './prisma/client';
import { PrismaClient } from '@/lib/generated/prisma';

export async function performCodegen(options: Types.GenerateOptions): Promise<void> {
  const output = await codegen(options);
  const outputPath = path.join(process.cwd(), 'graphql/generated', options.filename);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(outputPath, output);
  console.log(`✅ Codegen output written to: ${outputPath}`);
}

export async function performAstCodegen(): Promise<void> {
  const options: Types.GenerateOptions = {
    config: {
      numericEnums: true,
      contextType: {prisma: PrismaClient},
      useIndexSignature: true,
    },
    documents: [],
    filename: 'schema.graphql',
    schema: parse(printSchema(schema)),
    plugins: [{ 'schema-ast': {} }],
    pluginMap: {
      'schema-ast': schemaAstPlugin,
    },
  };

  await performCodegen(options);
}
