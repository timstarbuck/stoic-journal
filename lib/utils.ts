import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Compute streak helper: given an array of YYYY-MM-DD day strings, count
// consecutive days up to (and including) `now` that are present in the set.
export function computeStreakFromDays(
  days: string[],
  now = new Date().setDate(new Date().getDate() - 1) // previous day
): number {
  const set = new Set(days);
  let streak = 0;
  let cur = new Date(now);
  console.log(cur.toISOString());
  const toYMD = (d: Date) => d.toISOString().slice(0, 10);
  while (set.has(toYMD(cur))) {
    streak++;
    cur = new Date(cur.getTime() - 24 * 60 * 60 * 1000);
  }
  return streak;
}
