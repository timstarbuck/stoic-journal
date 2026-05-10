import React from 'react';

export interface EntryProps {
  id: string;
  type: 'morning' | 'evening';
  content: string;
  createdAt: string | Date;
  promptQuote?: string | null;
  positiveReflection?: string | null;
}

export default function EntryCard({
  id,
  type,
  content,
  createdAt,
  promptQuote,
  positiveReflection,
}: EntryProps) {
  const positiveLabel =
    type === 'morning' ? 'What am I grateful for today' : 'What did I do well today';
  const contentLabel =
    type === 'morning'
      ? 'What is my intention for the day'
      : 'What could I have done better today';

  return (
    <div data-testid={`entry-${id}`}>
      <div>
        <strong>{type === 'morning' ? '🌅 Morning' : '🌙 Evening'}</strong>
        <span style={{ marginLeft: 8 }}>{new Date(createdAt).toLocaleString()}</span>
      </div>

      {promptQuote ? (
        <blockquote data-testid="prompt-quote">{promptQuote}</blockquote>
      ) : null}

      {positiveReflection ? (
        <div>
          <div style={{ fontWeight: 600 }}>{positiveLabel}</div>
          <div data-testid="positive-reflection">{positiveReflection}</div>
        </div>
      ) : null}

      <div>
        <div style={{ fontWeight: 600, marginTop: 8 }}>{contentLabel}</div>
        <p data-testid="content">{content}</p>
      </div>
    </div>
  );
}
