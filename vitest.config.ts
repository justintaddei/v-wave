import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html'],
    },
    include: ['src/**/*.test.ts'],
  },
})
