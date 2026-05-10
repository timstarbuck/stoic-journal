# Squad Decisions

## Active Decisions

### Database Schema: New Journal Entry Fields (2026-05-09)

**Decision:** Add two nullable columns to journal_entries (prompt_quote, positive_reflection).

**Rationale:** Non-breaking addition to support richer reflections. Preserves existing `content` field and behaviour. Default for new fields is NULL.

**Status:** Approved  
**Implemented by:** Epictetus (migration)

**Next steps:**
- Frontend can send prompt_quote and positive_reflection in saveJournalEntry payloads (optional)
- Ops: consider running optional migration script to parse patterned content later

---

### Dashboard Card Display Order (2026-05-09)

**Decision:** Dashboard entry cards display fields in order: promptQuote (quote), positiveReflection (prompt/response), content (main reflection).

**Rationale:** Aligns UI with new database fields and provides clearer prompts for users.

**Display Labels:**
- **Morning reflections:**
  - positiveReflection: "What am I grateful for today"
  - content: "What is my intention for the day"
- **Evening reflections:**
  - positiveReflection: "What did I do well today"
  - content: "What could I have done better today"

**Implementation Notes:**
- Kept existing JournalEntry types; fields are optional and nullable
- Updated EntryCard and dashboard page to render new fields when present

**Status:** Implemented  
**Implemented by:** Seneca (frontend)

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
