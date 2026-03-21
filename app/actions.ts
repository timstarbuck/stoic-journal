"use server";

import { db } from "@/db";
import { stoicQuotesTable, journalEntriesTable, usersTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || "1";

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
 * Save a journal entry
 */
export async function saveJournalEntry(
  type: "morning" | "evening",
  content: string,
  userId?: string | number
) {
  try {
    const actualUserId = userId || DEFAULT_USER_ID;

    const result = await db.insert(journalEntriesTable).values({
      userId: actualUserId as any,
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
 * Get all journal entries grouped by date
 */
export async function getJournalEntries(userId?: string | number) {
  try {
    const actualUserId = userId || DEFAULT_USER_ID;

    const entries = await db
      .select()
      .from(journalEntriesTable)
      .where(eq(journalEntriesTable.userId, actualUserId as any))
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
 * Ensure default user exists
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
