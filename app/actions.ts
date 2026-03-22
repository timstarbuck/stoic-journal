"use server";


import { db } from "@/db";
import { stoicQuotesTable, journalEntriesTable, usersTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth/server";


const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || "1";

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
    console.warn("Failed to get authenticated user ID:", error);
  }
  // Fallback to default user ID if auth fails
  return DEFAULT_USER_ID;
}

/**
 * Get a random stoic quote by category
 */
export async function getRandomQuote(category: "morning" | "evening") {
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
    console.error("Error fetching quote:", error);
    throw new Error("Failed to fetch quote");
  }
}

/**
 * Save a journal entry for the authenticated user
 */
export async function saveJournalEntry(
  type: "morning" | "evening",
  content: string
) {
  try {
    const userId = await getAuthenticatedUserId();

    const result = await db.insert(journalEntriesTable).values({
      userId: userId as any,
      type,
      content,
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving journal entry:", error);
    throw new Error("Failed to save journal entry");
  }
}

/**
 * Get all journal entries for the authenticated user, grouped by date
 */
export async function getJournalEntries() {
  try {
    const userId = await getAuthenticatedUserId();

    const entries = await db
      .select()
      .from(journalEntriesTable)
      .where(eq(journalEntriesTable.userId, userId as any))
      .orderBy((t) => t.createdAt);

    // Group by date
    const grouped = entries.reduce(
      (acc, entry) => {
        const dateKey = entry.createdAt.toLocaleDateString();
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(entry);
        return acc;
      },
      {} as Record<string, typeof entries>
    );

    return Object.entries(grouped).map(([date, items]) => ({
      date,
      entries: items,
    }));
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw new Error("Failed to fetch journal entries");
  }
}

/**
 * Ensure the authenticated user exists in the database
 * (Neon Auth creates users, but we may need to store them in our users table)
 */
export async function ensureAuthenticatedUser() {
  try {
    console.log('Starting ensureAuthenticatedUser');
    const { data: session } = await auth.getSession();
   console.log('Session data:', session);

    if (!session?.user) {
      console.warn("No authenticated user found");
      return false;
    }

    console.log('ensureAuthenticatedUser', session.user)

    const userId = session.user.id;
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (existingUser.length === 0) {
      await db.insert(usersTable).values({
        id: userId as any,
        name: session.user.name || session.user.email || "User",
        createdAt: new Date(),
      });
    }

    return true;
  } catch (error) {
    console.error("Error ensuring authenticated user:", error);
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
        name: "Journal Keeper",
        createdAt: new Date(),
      });
    }

    return true;
  } catch (error) {
    console.error("Error ensuring default user:", error);
    // Don't throw, as this might fail due to constraints
    return false;
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
