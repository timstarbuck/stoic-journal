import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const journalEntriesTable = pgTable(
  'journal_entries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: varchar('type', {
      length: 10,
      enum: ['morning', 'evening'],
    }).notNull(),
    // New nullable fields introduced in 2026-05-09: prompt_quote and positive_reflection
    promptQuote: text('prompt_quote'),
    positiveReflection: text('positive_reflection'),
    // Existing content field is preserved and repurposed; remain NOT NULL for compatibility
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userCreatedAtIdx: index('journal_entries_user_id_created_at_idx').on(
      table.userId,
      table.createdAt.desc()
    ),
  })
);

export const stoicQuotesTable = pgTable('stoic_quotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: text('text').notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  category: varchar('category', {
    length: 10,
    enum: ['morning', 'evening'],
  }).notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type JournalEntry = typeof journalEntriesTable.$inferSelect;
export type StoicQuote = typeof stoicQuotesTable.$inferSelect;

export type NewUser = typeof usersTable.$inferInsert;
export type NewJournalEntry = typeof journalEntriesTable.$inferInsert;
export type NewStoicQuote = typeof stoicQuotesTable.$inferInsert;
