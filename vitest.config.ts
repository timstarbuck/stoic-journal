import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  test: {
    globals: false,
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
  },
});
