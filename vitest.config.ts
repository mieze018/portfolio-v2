// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

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
      // ESM 環境では __dirname が使えないため import.meta.url から解決
      libs: fileURLToPath(new URL('./libs', import.meta.url)),
      components: fileURLToPath(new URL('./components', import.meta.url)),
    },
  },
})
