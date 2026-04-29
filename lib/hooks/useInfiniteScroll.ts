'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getJournalEntries } from '@/app/actions';
import type { JournalEntry } from '@/db/schema';

export interface UseInfiniteScrollReturn {
  entries: JournalEntry[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => void;
}

export function useInfiniteScroll(initialLimit = 10): UseInfiniteScrollReturn {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  // Initial load
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    const loadInitial = async () => {
      try {
        setIsLoading(true);
        const result = await getJournalEntries(undefined, initialLimit);
        setEntries(result.entries);
        setCursor(result.nextCursor);
        setHasMore(!!result.nextCursor);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load entries');
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, [initialLimit]);

  // Load more entries
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || !cursor) return;

    try {
      setIsLoading(true);
      const result = await getJournalEntries(cursor, initialLimit);
      setEntries((prev) => [...prev, ...result.entries]);
      setCursor(result.nextCursor);
      setHasMore(!!result.nextCursor);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load more entries'
      );
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, isLoading, initialLimit]);

  return {
    entries,
    isLoading,
    hasMore,
    error,
    loadMore,
  };
}
