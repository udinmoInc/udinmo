import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL is not defined !');
}
