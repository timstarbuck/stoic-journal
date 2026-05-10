import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Polyfill IntersectionObserver (jsdom)
if (!(globalThis as any).IntersectionObserver) {
  (globalThis as any).IntersectionObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
    unobserve() {}
  };
}

// Mock actions used by Dashboard when needed
import { afterEach } from 'vitest';

vi.mock('../../app/actions', () => ({
  ensureAuthenticatedUser: async () => Promise.resolve(),
  getReflectionStats: async () => ({
    morningCount: 0,
    eveningCount: 0,
    morningStreak: 0,
    eveningStreak: 0,
  }),
}));

// ensure DOM cleanup between tests
afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

import EntryCard from '../EntryCard';

describe('EntryCard labels and rendering', () => {
  it('renders morning positive and content labels and texts', () => {
    render(
      <EntryCard
        id="m1"
        type="morning"
        content="Set intention for the day"
        createdAt={new Date().toISOString()}
        promptQuote={"Quote for morning"}
        positiveReflection={"I am grateful for coffee"}
      />
    );

    // Positive label and content label texts
    expect(screen.getByText('What am I grateful for today')).toBeTruthy();
    expect(screen.getByText('What is my intention for the day')).toBeTruthy();

    // Ensure the provided prompt, positive reflection and content are present
    const prompt = screen.getByTestId('prompt-quote');
    const positive = screen.getByTestId('positive-reflection');
    const content = screen.getByTestId('content');

    expect(prompt.textContent).toBe('Quote for morning');
    expect(positive.textContent).toBe('I am grateful for coffee');
    expect(content.textContent).toBe('Set intention for the day');

    // Ensure order in DOM: prompt -> positive -> content
    const nodes = Array.from(document.querySelectorAll('[data-testid="prompt-quote"], [data-testid="positive-reflection"], [data-testid="content"]'));
    const idxPrompt = nodes.indexOf(prompt);
    const idxPositive = nodes.indexOf(positive);
    const idxContent = nodes.indexOf(content);
    expect(idxPrompt).toBeGreaterThanOrEqual(0);
    expect(idxPrompt).toBeLessThan(idxPositive);
    expect(idxPositive).toBeLessThan(idxContent);
  });

  it('renders evening positive and content labels and texts', () => {
    render(
      <EntryCard
        id="e1"
        type="evening"
        content="Reflect on the day"
        createdAt={new Date().toISOString()}
        promptQuote={"Quote for evening"}
        positiveReflection={"I did well at shipping features"}
      />
    );

    expect(screen.getByText('What did I do well today')).toBeTruthy();
    expect(screen.getByText('What could I have done better today')).toBeTruthy();

    const prompt = screen.getByTestId('prompt-quote');
    const positive = screen.getByTestId('positive-reflection');
    const content = screen.getByTestId('content');

    expect(prompt.textContent).toBe('Quote for evening');
    expect(positive.textContent).toBe('I did well at shipping features');
    expect(content.textContent).toBe('Reflect on the day');

    const nodes = Array.from(document.querySelectorAll('[data-testid="prompt-quote"], [data-testid="positive-reflection"], [data-testid="content"]'));
    const idxPrompt = nodes.indexOf(prompt);
    const idxPositive = nodes.indexOf(positive);
    const idxContent = nodes.indexOf(content);
    expect(idxPrompt).toBeGreaterThanOrEqual(0);
    expect(idxPrompt).toBeLessThan(idxPositive);
    expect(idxPositive).toBeLessThan(idxContent);
  });
});

// Dashboard integration test: ensure ordering on rendered entry card
const SAMPLE_ENTRY = {
  id: '42',
  type: 'morning',
  content: 'Today I will focus on deep work',
  createdAt: new Date(),
  promptQuote: 'The obstacle is the way',
  positiveReflection: "Grateful for a good night's sleep",
} as any;

// Mock the infinite scroll hook to return our single entry (hoisted mock)
vi.mock('../../lib/hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: () => ({
    entries: [SAMPLE_ENTRY],
    isLoading: false,
    hasMore: false,
    error: null,
    loadMore: () => {},
  }),
}));

describe('Dashboard entry card rendering', () => {
  it('renders prompt, positive reflection, then main content in that order for dashboard entries', async () => {
    const { default: Dashboard } = await import('../../app/dashboard/page');

    render(React.createElement(Dashboard));

    // Wait for main heading to ensure component initialized
    const heading = await screen.findByText('Your Journal');
    expect(heading).toBeTruthy();

    // Grab the first occurrence of each data-testid
    const prompt = await screen.findByText('The obstacle is the way');
    const positive = await screen.findByText("Grateful for a good night's sleep");
    const content = await screen.findByText('Today I will focus on deep work');

    const nodes = Array.from(document.querySelectorAll('[data-testid="prompt-quote"], [data-testid="positive-reflection"], [data-testid="content"]'));
    const idxPrompt = nodes.indexOf(prompt);
    const idxPositive = nodes.indexOf(positive);
    const idxContent = nodes.indexOf(content);

    expect(idxPrompt).toBeGreaterThanOrEqual(0);
    expect(idxPrompt).toBeLessThan(idxPositive);
    expect(idxPositive).toBeLessThan(idxContent);
  });
});
