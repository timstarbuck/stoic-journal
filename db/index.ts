import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from 'dotenv';
import { Pool } from 'pg';
import * as schema from './schema';

config({ path: ['.env.local', '.env'] });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log('Connected to PostgreSQL');

export const db = drizzle(pool, { schema });
