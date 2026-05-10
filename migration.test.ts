import { describe, it, expect } from 'vitest';
import fs from 'fs';

const MIGRATION_PATH = 'drizzle/0002_add_journal_entry_fields.sql';

if (!process.env.TEST_DATABASE_URL) {
  it.skip('migration up/down - skipped (no TEST_DATABASE_URL)', () => {});
} else {
  it('runs migration up and down without data loss', async () => {
    const { Pool } = await import('pg');
    const sql = fs.readFileSync(MIGRATION_PATH, 'utf8');
    const parts = sql.split('--> statement-breakpoint');
    const upSql = parts[0];
    const downSql = parts[1];

    const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
    try {
      await pool.query('DROP TABLE IF EXISTS journal_entries;');
      await pool.query(`CREATE TABLE journal_entries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, type varchar(10) NOT NULL, content text NOT NULL, created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL);`);
      await pool.query(`INSERT INTO journal_entries (id, user_id, type, content, created_at) VALUES ('00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000010','morning','original content', NOW())`);

      // Run up migration
      await pool.query(upSql);

      // Verify new columns exist and data preserved
      const colRes = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='journal_entries' and column_name='prompt_quote'");
      expect(colRes.rowCount).toBeGreaterThan(0);

      const res = await pool.query("SELECT content FROM journal_entries WHERE id='00000000-0000-0000-0000-000000000001'");
      expect(res.rows[0].content).toBe('original content');

      // Run down migration
      await pool.query(downSql);

      const colRes2 = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='journal_entries' and column_name='prompt_quote'");
      expect(colRes2.rowCount).toBe(0);
    } finally {
      await pool.end();
    }
  });
}
