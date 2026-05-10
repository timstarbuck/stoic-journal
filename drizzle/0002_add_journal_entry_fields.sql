-- Up: add new nullable fields for journal entries
ALTER TABLE "journal_entries" ADD COLUMN IF NOT EXISTS "prompt_quote" TEXT;
ALTER TABLE "journal_entries" ADD COLUMN IF NOT EXISTS "positive_reflection" TEXT;
--> statement-breakpoint
-- Down: remove the fields (reversible)
ALTER TABLE "journal_entries" DROP COLUMN IF EXISTS "positive_reflection";
ALTER TABLE "journal_entries" DROP COLUMN IF EXISTS "prompt_quote";
