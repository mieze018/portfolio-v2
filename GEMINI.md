# GEMINI.md

このプロジェクトのルール・規約の原本は Storybook ドキュメント（`components/Introduction.mdx`）と `lat.md/` ナレッジグラフで管理している。

## lat.md ナレッジグラフ

このプロジェクトは [lat.md](https://www.npmjs.com/package/lat.md) を使ってコードベースのナレッジグラフを管理している。規約・アーキテクチャ・ツール構成の詳細は `lat.md/` ディレクトリを参照。

- `lat.md/conventions.md` — 命名規則・コンポーネント設計・TypeScript ルール
- `lat.md/styling.md` — Tailwind CSS v4 + CVA によるスタイリング規約
- `lat.md/architecture.md` — ディレクトリ構造と Atomic Design の境界線
- `lat.md/tooling.md` — Biome・Husky・テスト・CI 構成

---

## 規約ドキュメント（原本）

→ [components/Introduction.mdx](components/Introduction.mdx)

---

## 要点サマリー

AIが即座に参照できるよう、最低限の要点をここにまとめる。詳細・背景は `lat.md/conventions.md` と `lat.md/styling.md` を参照。

### 命名規則

| 対象 | ケース |
| --- | --- |
| `pages/` 以下のルーティングファイル | スネークケース |
| React コンポーネント（`.tsx`）とそのディレクトリ | パスカルケース |
| メソッド・型（`.ts`）・設定ファイル | キャメルケース |

### コンポーネント

- **Named export のみ** — default export は使わない
- **index.ts は作らない** — ファイルパスで直接 import する
- Props の型名は `lowerCamelCase + Type` サフィックス（例: `eventItemType`）
- `type` を基本とし、外部ライブラリ拡張時のみ `interface` を使う

### TypeScript / Biome

- `import type { ... }` 必須（`useImportType: "error"`）
- 未使用 import は error、未使用変数は warn
- シングルクォート、セミコロンなし、末尾カンマ ES5 スタイル、インデント スペース2、最大行長 100

### スタイリング

- `tw(tag, cva(...))` — HTML 要素にスタイルを付ける
- `twe(Component, cva(...))` — React コンポーネントにスタイルを付ける
- `cn(...classes)` — クラスをマージする（clsx + tailwind-merge）

### コメント

- **日本語** で記述する
- 「何をしているか」より **Why（なぜそうしているか）** を優先する
- Biome ルールを意図的に無視するときは理由も添える（`biome-ignore lint/...: 理由`）
