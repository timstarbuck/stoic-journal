Work on layout.

- home page - remove unnecessary items
- Add sign in/up CTA

Add word count to journal entry.

Add field for prompt (quote)

Morning
What am I grateful for today
What is my intention for the day

Evening
What did I do well today
What could I have done better

For the morning reflection we want to add a prompt/response "What am I grateful for today"
For the morning reflection modify the reflection label to "What is my intention for the day"

For the evening reflection we want to add a prompt/response "What did I do well today"
For the evening reflection modify the reflection label to "What could I have done better today"

Break up the `content` field of the `journal_entries` table into three fields.

1. The prompt quote provided for the day.
2. "What am I grateful for today"/"What did I do well today" responses.
3. The content field itself should hold answers to "What is my intention for the day"/"What could I have done better"

We want these to be non-breaking changes.

Refactor the data entry.

Refactor the dashboard display.

Add checks to see if content in the new fields exists in the entry cards.
