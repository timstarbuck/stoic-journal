import assert from 'assert';
import { computeStreakFromDays } from '../lib/utils';

function runTests() {
  // Set a fixed "now"
  const now = new Date('2026-04-26T12:00:00Z');

  // Case 1: consecutive today, yesterday, day before => 3
  const days1 = ['2026-04-26', '2026-04-25', '2026-04-24'];
  assert.strictEqual(computeStreakFromDays(days1, now), 3, 'streak should be 3');

  // Case 2: yesterday and day before only => 0 (no entry today)
  const days2 = ['2026-04-25', '2026-04-24'];
  assert.strictEqual(computeStreakFromDays(days2, now), 0, 'streak should be 0 when today missing');

  // Case 3: only today => 1
  const days3 = ['2026-04-26'];
  assert.strictEqual(computeStreakFromDays(days3, now), 1, 'streak should be 1');

  // Case 4: no days => 0
  const days4: string[] = [];
  assert.strictEqual(computeStreakFromDays(days4, now), 0, 'streak should be 0 for empty');

  // Case 5: long consecutive sequence
  const days5 = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  assert.strictEqual(computeStreakFromDays(days5, now), 10, 'streak should be 10');

  console.log('All streak tests passed');
}

try {
  runTests();
  process.exit(0);
} catch (err) {
  console.error('Streak tests failed:', err);
  process.exit(1);
}
