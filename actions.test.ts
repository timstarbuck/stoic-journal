import { describe, it, expect, vi, beforeEach } from 'vitest';

process.env.DEFAULT_USER_ID = 'test-user';

// Mock Neon auth so importing server auth doesn't require next/headers during tests
vi.mock('@/lib/auth/server', () => {
  return {
    auth: {
      getSession: async () => ({ data: { user: { id: process.env.DEFAULT_USER_ID } } }),
    },
  };
});

// Mock the db module to capture inserts and queries
vi.mock('@/db', () => {
  const insert = vi.fn(() => ({
    values: vi.fn(async () => ({ success: true })),
  }));

  const MockQuery = (rows: any[]) => {
    return {
      where() {
        return this;
      },
      orderBy() {
        return this;
      },
      limit() {
        return this;
      },
      then(resolve: any) {
        return Promise.resolve(rows).then(resolve);
      },
    };
  };

  const select = vi.fn(() => ({ from: () => ({ $dynamic: () => MockQuery([]) }) }));

  return { db: { insert, select } };
});

import * as actions from '@/app/actions';
import { db } from '@/db';

describe('app actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saveJournalEntry accepts string payload', async () => {
    const payload = 'hello content';
    const res = await actions.saveJournalEntry('morning', payload as any);
    expect(res).toEqual({ success: true });
    expect((db as any).insert).toHaveBeenCalled();

    const calledWith = (db as any).insert.mock.calls[0][0];
    // The insert is called as db.insert(table).values({...}) in the real API,
    // but our mock insert is called directly from the actions, so ensure it was invoked.
    expect((db as any).insert).toHaveBeenCalled();
  });

  it('saveJournalEntry accepts object payload with optional fields', async () => {
    const payload = { content: 'c', promptQuote: 'pq', positiveReflection: 'pr' };
    const res = await actions.saveJournalEntry('evening', payload as any);
    expect(res).toEqual({ success: true });
    expect((db as any).insert).toHaveBeenCalled();
  });

  it('getJournalEntries returns entries array', async () => {
    // set select to return a query that resolves to sample rows
    const rows = [
      { id: '1', type: 'morning', content: 'a', createdAt: new Date() },
    ];
    (db as any).select.mockImplementation(() => ({ from: () => ({ $dynamic: () => ({
      where() { return this; },
      orderBy() { return this; },
      limit() { return this; },
      then(resolve: any) { return Promise.resolve(rows).then(resolve); }
    }) }) }));

    const res = await actions.getJournalEntries(undefined, 10);
    expect(res.entries).toBeDefined();
    expect(Array.isArray(res.entries)).toBe(true);
  });
});
