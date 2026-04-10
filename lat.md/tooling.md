# Tooling

ビルドツール・リント・テスト・CI の構成。コーディング規約は [[conventions]] を参照。

## Node.js バージョン管理（mise）

Node.js のバージョンは [mise](https://mise.jdx.dev/) で管理する。`.mise.toml` にバージョンを記述しており、CI・ローカル双方で同一バージョンが使われる。

### セットアップ

mise をインストールし、シェルフックを設定してからリポジトリで `mise install` を実行する。

```bash
# mise をインストール（macOS / Linux）
curl https://mise.run | sh

# シェルへのフック設定（~/.zshrc や ~/.bashrc に追加）
# zsh の例:
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc

# リポジトリルートで Node をインストール
mise install
```

### 使い方

```bash
mise install        # .mise.toml に記載のツールを一括インストール
mise current node   # 現在アクティブな Node.js バージョンを確認
mise ls             # インストール済みのツール一覧
mise upgrade node   # Node.js を最新版にアップグレード（.mise.toml も更新される）
```

Node バージョンを変更する場合は `.node-version` と `.mise.toml` の両方を更新する。CI は `.node-version` を参照し、mise はローカルで `.mise.toml` を使用する。

## Linting and Formatting

Biome を単一ツールで lint + format を担う。ESLint/Prettier は使わない。

- `pnpm check` — lint + format を同時に修正
- `pnpm check:ci` — CI 用（`--write` なし、差分を出さずに検査のみ）
- `pnpm lint` — lint のみ
- `pnpm format` — format のみ

## Unused Exports / Files Detection（Knip）

未使用 export・ファイル・依存パッケージの検出には [Knip](https://knip.dev/) を使う。`ts-unused-exports` から移行済み。

- `pnpm unused` — knip を実行して未使用の export / ファイル / 依存パッケージを一覧表示
- 設定ファイル: `knip.json`（プロジェクトルート）

Knip は Next.js のエントリポイント（`pages/`・`app/`）を自動認識するため、`ts-unused-exports` で必要だった `--excludePathsFromReport=pages` のような手動除外設定は不要。

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

GitHub Actions で以下のワークフローを実行。Node 22 / pnpm 10 を使用。Node バージョンは `.node-version` で参照する。

`actions/setup-node` は `.mise.toml` の TOML パースに非互換があるため `.node-version` を採用。mise を使う場合は `.mise.toml` も同じバージョンに合わせておく。

- **lint**: Biome check（PR ごと）
- **test**: Vitest + カバレッジ（PR ごと）
- **chromatic**: Visual Regression（PR ごと）
- **cypress**: E2E テスト（PR ごと）
