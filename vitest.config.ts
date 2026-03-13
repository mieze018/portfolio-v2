// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // Why: libs/hooks/__tests__/ 配下を vitest のテスト対象にする。
    // 既存の @playwright/test ベースの .spec.ts/.test.tsx と競合しない。
    include: ['libs/hooks/__tests__/**/*.test.ts'],
    exclude: ['node_modules', '.next', 'cypress'],
  },
  resolve: {
    alias: {
      // Why: tsconfig.json の baseUrl: "./" に合わせたパスエイリアス
      libs: path.resolve(__dirname, './libs'),
      components: path.resolve(__dirname, './components'),
    },
  },
})
