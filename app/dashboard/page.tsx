'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ensureAuthenticatedUser, getReflectionStats } from '@/app/actions';
import type { JournalEntry } from '@/db/schema';
import Link from 'next/link';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';

export default function Dashboard() {
  const { entries, isLoading, hasMore, error, loadMore } =
    useInfiniteScroll(10);
  const [expandedEntries, setExpandedEntries] = useState<
    Record<string, boolean>
  >({});
  const [initialized, setInitialized] = useState(false);
  const [stats, setStats] = useState<{
    morningCount: number;
    eveningCount: number;
    morningStreak: number;
    eveningStreak: number;
  } | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialized) return;

    const loadStats = async () => {
      try {
        const data = await getReflectionStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load reflection stats:', err);
      }
    };

    loadStats();
  }, [initialized]);

  // Initialize auth on mount
  useEffect(() => {
    const init = async () => {
      try {
        await ensureAuthenticatedUser();
        setInitialized(true);
      } catch (err) {
        console.error('Failed to initialize:', err);
      }
    };
    init();
  }, []);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    if (!initialized || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore, initialized]);

  const toggleEntry = (id: string) => {
    setExpandedEntries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Group entries by date on client-side
  const groupedEntries = useMemo(() => {
    const grouped: Record<string, JournalEntry[]> = {};
    entries.forEach((entry) => {
      const dateKey = entry.createdAt.toLocaleDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(entry);
    });

    return Object.entries(grouped)
      .map(([date, items]) => ({
        date,
        entries: items,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries]);

  const morningEntries = useMemo(
    () =>
      groupedEntries.flatMap((g) =>
        g.entries.filter((e) => e.type === 'morning')
      ),
    [groupedEntries]
  );

  const eveningEntries = useMemo(
    () =>
      groupedEntries.flatMap((g) =>
        g.entries.filter((e) => e.type === 'evening')
      ),
    [groupedEntries]
  );

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Loading your journal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Your Journal
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            A record of your daily reflections and growth
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/morning" className="block">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border-0 shadow">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <CardTitle className="text-2xl">Morning Reflection</CardTitle>
                <CardDescription>
                  {stats?.morningCount ?? morningEntries.length} entries
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {stats ? `${stats.morningStreak}-day streak` : ''}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600 dark:text-slate-400">
                  Start your day with Stoic wisdom
                </p>
                <Button className="mt-4 w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800">
                  New Morning Reflection
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/evening" className="block">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border-0 shadow bg-slate-800 dark:bg-slate-900 text-slate-50">
              <CardHeader className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40">
                <CardTitle className="text-2xl">Evening Reflection</CardTitle>
                <CardDescription className="text-slate-300">
                  {stats?.eveningCount ?? eveningEntries.length} entries
                  <div className="text-sm text-slate-300 mt-1">
                    {stats ? `${stats.eveningStreak}-day streak` : ''}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-400">
                  Reflect on your day with philosophical wisdom
                </p>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                  New Evening Reflection
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {entries.length === 0 ? (
          <Card className="border-0 shadow">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                You haven't written any reflections yet.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
                Start with a morning or evening reflection to begin your
                journaling journey.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-12 mb-6">
              Your Entries
            </h2>

            {groupedEntries.map((group) => (
              <div key={group.date}>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 px-1">
                  {group.date}
                </h3>
                <div className="space-y-3">
                  {group.entries.map((entry) => {
                    const entryId = entry.id.toString();
                    const isExpanded = expandedEntries[entryId];

                    return (
                      <Card
                        key={entry.id}
                        className="border-0 shadow hover:shadow-md transition-shadow"
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {entry.type === 'morning'
                                ? '🌅 Morning'
                                : '🌙 Evening'}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {entry.createdAt.toLocaleTimeString()}
                            </span>
                          </div>
                            {entry.promptQuote ? (
                              <blockquote className="text-slate-500 italic mb-2" data-testid="prompt-quote">{entry.promptQuote}</blockquote>
                            ) : null}

                            {entry.positiveReflection ? (
                              <div className="mb-2">
                                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                  {entry.type === 'morning' ? 'What am I grateful for today' : 'What did I do well today'}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300" data-testid="positive-reflection">{entry.positiveReflection}</p>
                              </div>
                            ) : null}

                            <div>
                              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">
                                {entry.type === 'morning' ? 'What is my intention for the day' : 'What could I have done better today'}
                              </div>
                              <p className={`text-slate-700 dark:text-slate-300 whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`} data-testid="content">
                                {entry.content}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleEntry(entryId)}
                              className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                            >
                              {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Loading indicator and end state */}
            <div
              ref={observerTarget}
              className="py-8 flex flex-col items-center justify-center"
            >
              {isLoading && (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900 dark:border-slate-50 mb-3"></div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Loading more entries...
                  </p>
                </div>
              )}
              {!isLoading && !hasMore && entries.length > 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  No more entries
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
