# Tooling

ビルドツール・リント・テスト・CI の構成。コーディング規約は [[conventions]] を参照。

## Linting and Formatting

Biome を単一ツールで lint + format を担う。ESLint/Prettier は使わない。

- `pnpm check` — lint + format を同時に修正
- `pnpm check:ci` — CI 用（`--write` なし、差分を出さずに検査のみ）
- `pnpm lint` — lint のみ
- `pnpm format` — format のみ

## Git Hooks

Husky + lint-staged でコミット前・プッシュ前にチェックを実行する。

- **pre-commit**: `lint-staged` → ステージ済みファイルに `biome check --write` を実行
- **pre-push**: `biome check:ci`（lint のみ、書き込みなし）で最終検証

## Testing

テスト構成は3層。ユニット・Storybook・E2E それぞれ独立して実行できる。

- `pnpm test` — Vitest（unit + Storybook）
- `pnpm test:unit` — Vitest unit tests のみ（happy-dom 環境）
- `pnpm test:storybook` — Storybook addon-vitest（Playwright 経由）
- `pnpm cy:test` — Cypress E2E

Vitest の unit テストは `happy-dom`（jsdom ではなく）を使用。

## CI Workflows

GitHub Actions で以下のワークフローを実行。Node 22 / pnpm 10 を使用。

- **lint**: Biome check（PR ごと）
- **test**: Vitest + カバレッジ（PR ごと）
- **chromatic**: Visual Regression（PR ごと）
- **cypress**: E2E テスト（PR ごと）
