# Tooling

ビルドツール・リント・テスト・CI の構成。コーディング規約は [[conventions]] を参照。

## Node.js バージョン管理（mise）

Node.js のバージョンは [mise](https://mise.jdx.dev/) で管理する。`.mise.toml` にバージョンを記述しており、CI・ローカル双方で同一バージョンが使われる。

### セットアップ

mise をインストールし、シェルフックを設定してからリポジトリで `mise install` を実行する。

#### pnpm（推奨・マルチプラットフォーム）

このプロジェクトは pnpm を使用しているため、pnpm 経由のインストールが最もシンプルでクロスプラットフォームに動作する。

```bash
pnpm add -g @jdx/mise
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

Knip は Astro のルート、React コンポーネント、libs を検査する。エントリポイントは knip.json に定義する。

Knip は **pre-push フック**と **CI lint ジョブ**にも組み込み済み。現時点では既存の指摘が残っているため非ブロッキング（`|| true` / `continue-on-error: true`）で動作する。指摘を全件解消後にハードゲートへ切り替える予定。

## Git Hooks

Husky + lint-staged でコミット前・プッシュ前にチェックを実行する。

- **pre-commit**: `lint-staged` → ステージ済みファイルに `biome check --write` を実行
- **pre-push**: `biome check:ci`、`lat check`、`knip`（非ブロッキング）を実行

## lat.md

[lat.md](https://www.npmjs.com/package/lat.md) でソースコードとナレッジグラフを紐付ける。

### Windows パッチ（pnpm patch）

v0.11.0 時点で `buildFileIndex` がパスを `/` のみで分割するため、Windows 環境（パス区切りが `\`）ではファイルインデックスが空になり、短い形式の wiki link（`[[conventions]]` 等）が解決できない。`pnpm patch` で `split('/')` → `split(/[/\\]/)` に修正済み（`patches/lat.md@0.11.0.patch`）。公式修正後はパッチを削除してよい。

## Testing

テスト構成は3層。ユニット・Storybook・E2E それぞれ独立して実行できる。

- `pnpm test` — Vitest（unit + Storybook）
- `pnpm test:unit` — Vitest unit tests のみ（happy-dom 環境）
- `pnpm test:storybook` — Storybook addon-vitest（Playwright 経由）
- `pnpm cy:test` — Cypress E2E

Vitest の unit テストは `happy-dom`（jsdom ではなく）を使用。

## Graphify

[graphify](https://graphify.net/) はローカルの知識グラフ生成ツールとして任意で利用できる。
リポジトリからは npm script 経由で実行する。

```bash
uv tool install graphifyy && graphify install
graphify hook install 
pnpm graphify
```
claudeで一度だけ実行
```bash
graphify claude install
```
graphifyのアップデート
```bash
uv tool pip install --upgrade graphifyy
```

`pnpm graphify` は差分のみ再抽出する。初回・更新どちらも同じコマンドでよい。

`graphify-out/` は生成物のため Git 管理しない。

## CI Workflows

GitHub Actions で以下のワークフローを実行。Node 22.23.4 / pnpm 10.33.0 を使用。Node バージョンは `.node-version` で参照する。

`actions/setup-node` は `.mise.toml` の TOML パースに非互換があるため `.node-version` を採用。mise を使う場合は `.mise.toml` も同じバージョンに合わせておく。

- **lint**: Biome check + lat check + Knip（PR ごと）
- **test**: Vitest + カバレッジ（PR ごと）
- **chromatic**: Visual Regression（PR ごと）
- **cypress**: E2E テスト（PR ごと）

## Astro / Cloudflare Pages

- `pnpm dev:fixtures` / `pnpm build:fixtures` — 認証不要の明示的な検証モード。バナーと noindex 付き。
- `pnpm dev` / `pnpm build` — 実データ。NOTION_TOKEN / TUMBLR_API_KEY をビルド環境へ設定する。
- `pnpm typecheck` — Astro / React / テストの型チェック。Cypress のグローバル型は除外する。
- `pnpm test:e2e` — fixture ビルドを起動し、Playwright で静的生成・モーダル・遷移を検証する。
- `pnpm preview` — dist のローカル検証。配信環境は静的ホスティングでよい。
- CI `astro.yml` — 型チェック、Storybook のブラウザテスト、Playwright。Cypress も fixture モードで実行する。
- 同一リポジトリの PR は `real-content` ジョブで GitHub シークレットを利用して実データをビルドする。
  認証情報はビルドステップだけに渡し、fork / Dependabot ではこのジョブを実行しない。
- CI `chromatic.yml` — Storybook の VRT。[[components/Portfolio.stories.tsx]] で主要ページを
  PC / モバイルの固定データで検証する。差分の承認は別途レビューし、自動承認しない。
- fixture の About に実績データを含め、SSR / hydration の不整合も E2E で検証する。
- Cloudflare アカウントは PR の CI / VRT には不要。Pages の実データプレビュー準備時に作成する。

Node は Astro 7 が要求する 22.23.4 以上へ更新した。Cloudflare Pages のコマンドは
`pnpm build`、出力は `dist`。本番切り替え・認証・画像配信の詳細は
[移行ガイド](../docs/CLOUDFLARE_MIGRATION.md) を参照。

Biome 2.4 は Astro の frontmatter とテンプレート間の参照を追跡できないため、
`.astro` に限り noUnusedImports / noUnusedVariables を無効にする。
テンプレートの整合性は `pnpm typecheck`（astro check）で検証する。
