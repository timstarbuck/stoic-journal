const assert = require('assert');

function computeStreakFromDays(days, now = new Date()) {
  const set = new Set(days);
  let streak = 0;
  let cur = new Date(now);
  const toYMD = (d) => d.toISOString().slice(0, 10);
  while (set.has(toYMD(cur))) {
    streak++;
    cur = new Date(cur.getTime() - 24 * 60 * 60 * 1000);
  }
  return streak;
}

function runTests() {
  const now = new Date('2026-04-26T12:00:00Z');

  const days1 = ['2026-04-26', '2026-04-25', '2026-04-24'];
  assert.strictEqual(computeStreakFromDays(days1, now), 3, 'streak should be 3');

  const days2 = ['2026-04-25', '2026-04-24'];
  assert.strictEqual(computeStreakFromDays(days2, now), 0, 'streak should be 0 when today missing');

  const days3 = ['2026-04-26'];
  assert.strictEqual(computeStreakFromDays(days3, now), 1, 'streak should be 1');

  const days4 = [];
  assert.strictEqual(computeStreakFromDays(days4, now), 0, 'streak should be 0 for empty');

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
