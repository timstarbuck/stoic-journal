'use server';

import { db } from '@/db';
import { stoicQuotesTable, journalEntriesTable, usersTable } from '@/db/schema';
import { eq, sql, desc, lt } from 'drizzle-orm';
import { auth } from '@/lib/auth/server';
import { computeStreakFromDays } from '@/lib/utils';

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || '1';

/**
 * Get the authenticated user's ID from Neon Auth session
 */
async function getAuthenticatedUserId(): Promise<string> {
  try {
    const { data: session } = await auth.getSession();
    if (session?.user?.id) {
      return session.user.id;
    }
  } catch (error) {
    console.warn('Failed to get authenticated user ID:', error);
  }
  // Fallback to default user ID if auth fails
  return DEFAULT_USER_ID;
}

/**
 * Get a random stoic quote by category
 */
export async function getRandomQuote(category: 'morning' | 'evening') {
  try {
    const quotes = await db
      .select()
      .from(stoicQuotesTable)
      .where(eq(stoicQuotesTable.category, category));

    if (quotes.length === 0) return null;

    const daySeed = computeDaySeed();
    const idx = hashString(`${category}-${daySeed}`) % quotes.length;
    return quotes[idx] ?? quotes[0];
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error('Failed to fetch quote');
  }
}

/**
 * Save a journal entry for the authenticated user
 */
export async function saveJournalEntry(
  type: 'morning' | 'evening',
  payload: string | { content?: string; promptQuote?: string | null; positiveReflection?: string | null }
) {
  try {
    const userId = await getAuthenticatedUserId();

    // Support legacy callers that pass a string as the content
    const contentValue = typeof payload === 'string' ? payload : payload.content ?? '';
    const promptQuoteValue = typeof payload === 'string' ? null : payload.promptQuote ?? null;
    const positiveReflectionValue = typeof payload === 'string' ? null : payload.positiveReflection ?? null;

    await db.insert(journalEntriesTable).values({
      userId: userId as any,
      type,
      content: contentValue,
      promptQuote: promptQuoteValue,
      positiveReflection: positiveReflectionValue,
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving journal entry:', error);
    throw new Error('Failed to save journal entry');
  }
}

/**
 * Get all journal entries for the authenticated user, grouped by date
 */
export async function getJournalEntries(cursor?: string, limit = 20) {
  try {
    const userId = await getAuthenticatedUserId();

    // Use $dynamic() to allow chaining where after orderBy
    let query = db.select().from(journalEntriesTable).$dynamic();

    query = query.where(eq(journalEntriesTable.userId, userId as any));

    if (cursor) {
      query = query.where(lt(journalEntriesTable.createdAt, new Date(cursor)));
    }

    query = query.orderBy((t) => desc(t.createdAt)).limit(limit + 1);

    const results = await query;

    // Check if there are more entries
    const hasMore = results.length > limit;
    const entries = results.slice(0, limit);
    const nextCursor =
      entries.length > 0
        ? entries[entries.length - 1]?.createdAt.toISOString()
        : undefined;

    return {
      entries,
      nextCursor: hasMore ? nextCursor : undefined,
    };
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw new Error('Failed to fetch journal entries');
  }
}

/**
 * Ensure the authenticated user exists in the database
 * (Neon Auth creates users, but we may need to store them in our users table)
 */
export async function ensureAuthenticatedUser() {
  try {
    const { data: session } = await auth.getSession();

    if (!session?.user) {
      console.warn('No authenticated user found');
      return false;
    }

    const userId = session.user.id;
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (existingUser.length === 0) {
      await db.insert(usersTable).values({
        id: userId as any,
        name: session.user.name || session.user.email || 'User',
        email: session.user.email ?? null,
        createdAt: new Date(),
      });
    } else {
      // If the user exists but the email field is not set, populate it from the auth session
      const user = existingUser[0] as any;
      if ((!user.email || user.email === '') && session.user.email) {
        await db
          .update(usersTable)
          .set({ email: session.user.email })
          .where(eq(usersTable.id, userId as any));
      }
    }

    return true;
  } catch (error) {
    console.error('Error ensuring authenticated user:', error);
    return false;
  }
}

/**
 * Ensure default user exists (for backwards compatibility)
 */
export async function ensureDefaultUser() {
  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, DEFAULT_USER_ID as any));

    if (existingUser.length === 0) {
      await db.insert(usersTable).values({
        id: DEFAULT_USER_ID as any,
        name: 'Journal Keeper',
        createdAt: new Date(),
      });
    }

    return true;
  } catch (error) {
    console.error('Error ensuring default user:', error);
    // Don't throw, as this might fail due to constraints
    return false;
  }
}

export async function getReflectionStats() {
  try {
    const userId = await getAuthenticatedUserId();

    // Aggregate counts per type
    const counts = await db
      .select({ type: journalEntriesTable.type, count: sql`count(*)` })
      .from(journalEntriesTable)
      .where(eq(journalEntriesTable.userId, userId as any))
      .groupBy(journalEntriesTable.type);

    const morningCount = Number(
      (counts.find((c: any) => c.type === 'morning') as any)?.count ?? 0
    );
    const eveningCount = Number(
      (counts.find((c: any) => c.type === 'evening') as any)?.count ?? 0
    );

    // Helper to fetch distinct day strings (YYYY-MM-DD) for a given type
    const getDaysForType = async (typeVal: 'morning' | 'evening') => {
      const rows = await db
        .select({ createdAt: journalEntriesTable.createdAt })
        .from(journalEntriesTable)
        .where(
          sql`${eq(journalEntriesTable.userId, userId as any)} and ${eq(journalEntriesTable.type, typeVal)}`
        )
        .orderBy((t) => desc(t.createdAt))
        .limit(365); // limit to a year for performance

      const days = Array.from(
        new Set(
          rows.map((r: any) => new Date(r.createdAt).toISOString().slice(0, 10))
        )
      );
      return days;
    };

    const morningDays = await getDaysForType('morning');
    const eveningDays = await getDaysForType('evening');

    // if the days array includes the current day,
    // we want to count it as part of the streak, so we use today as the "now" parameter
    // otherwise use yesterday to exclude today from the streak count
    const todayStr = new Date().toISOString().slice(0, 10);
    const nowForMorning = morningDays.includes(todayStr)
      ? new Date().getTime()
      : new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime();
    const nowForEvening = eveningDays.includes(todayStr)
      ? new Date().getTime()
      : new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime();
    const morningStreak = computeStreakFromDays(morningDays, nowForMorning);
    const eveningStreak = computeStreakFromDays(eveningDays, nowForEvening);

    return { morningCount, eveningCount, morningStreak, eveningStreak };
  } catch (error) {
    console.error('Error computing reflection stats:', error);
    throw new Error('Failed to compute reflection stats');
  }
}

function computeDaySeed(date = new Date()) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor(date.getTime() / msPerDay);
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
