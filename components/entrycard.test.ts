import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import EntryCard from '@/components/EntryCard';

describe('EntryCard component', () => {
  it('renders content and hides optional fields when absent', () => {
    const html = renderToString(
      React.createElement(EntryCard, {
        id: '1',
        type: 'morning',
        content: 'Hello world',
        createdAt: new Date().toISOString(),
      })
    );

    expect(html).toContain('Hello world');
    expect(html).not.toContain('data-testid="prompt-quote"');
    expect(html).not.toContain('data-testid="positive-reflection"');
  });

  it('renders promptQuote and positiveReflection when provided', () => {
    const html = renderToString(
      React.createElement(EntryCard, {
        id: '2',
        type: 'evening',
        content: 'Evening notes',
        createdAt: new Date().toISOString(),
        promptQuote: 'Be like the rock',
        positiveReflection: 'I did well today',
      })
    );

    expect(html).toContain('Be like the rock');
    expect(html).toContain('I did well today');
  });
});
