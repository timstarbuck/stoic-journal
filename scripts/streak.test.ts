import { test, expect } from 'vitest';
import { computeStreakFromDays } from '../lib/utils';

const now = new Date('2026-04-26T12:00:00Z');

test('consecutive today, yesterday, day before => 3', () => {
  const days1 = ['2026-04-26', '2026-04-25', '2026-04-24'];
  expect(computeStreakFromDays(days1, now)).toBe(3);
});

test('yesterday and day before only => 0 (today missing)', () => {
  const days2 = ['2026-04-25', '2026-04-24'];
  expect(computeStreakFromDays(days2, now)).toBe(0);
});

test('only today => 1', () => {
  const days3 = ['2026-04-26'];
  expect(computeStreakFromDays(days3, now)).toBe(1);
});

test('no days => 0', () => {
  const days4: string[] = [];
  expect(computeStreakFromDays(days4, now)).toBe(0);
});

test('long consecutive sequence => 10', () => {
  const days5 = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  expect(computeStreakFromDays(days5, now)).toBe(10);
});
