// vitest.config.ts
// Why: projects 構成で unit テストと storybook テストを分離する。
// unit テストは jsdom 環境、storybook テストは Playwright ブラウザ環境で実行。
// カバレッジは両方のプロジェクトから統合して計測される。

import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Why: tsconfig.json の baseUrl: "./" に合わせたパスエイリアス
      // ESM 環境では __dirname が使えないため import.meta.url から解決
      libs: fileURLToPath(new URL('./libs', import.meta.url)),
      components: fileURLToPath(new URL('./components', import.meta.url)),
      pages: fileURLToPath(new URL('./pages', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'json'],
      // Why: CI (CI=true) では unit テストのみなので libs/ に限定。
      // ローカルでは Storybook テストも含めて components/ もカバレッジ対象にする。
      include: process.env.CI
        ? ['libs/**/*.{ts,tsx}']
        : ['libs/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/*.d.ts',
        '**/node_modules/**',
        // Why: テスト不可能または純粋な定数のみのファイルを除外
        // fonts.ts は next/font/google のランタイム初期化でテスト環境では動作しない
        // notionDB.ts, routes.ts はロジックを含まない定数定義のみ
        // libs/test/ はテストヘルパー（モックデータ等）のため coverage 対象外とする
        'libs/fonts.ts',
        'libs/notionDB.ts',
        'libs/routes.ts',
        'libs/test/**',
      ],
    },
    projects: [
      // --- Unit テスト (jsdom) ---
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          include: ['libs/**/*.test.{ts,tsx}', 'libs/**/*.spec.{ts,tsx}'],
          exclude: ['node_modules', '.next', 'cypress', 'tests'],
        },
      },
      // --- Storybook テスト (Playwright browser) ---
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'yarn storybook --no-open',
          }),
        ],
        resolve: {
          alias: {
            // Why: @storybook/nextjs-vite の NextImage モックが Vitest ブラウザ環境で
            // object として解決されるバグを回避。軽量な img 要素モックに差し替え。
            'next/image': path.join(dirname, '.storybook/mocks/next-image.tsx'),
          },
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
