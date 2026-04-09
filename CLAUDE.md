# Instruction

このプロジェクトのルール・規約の原本は Storybook ドキュメント（`components/Introduction.mdx`）と `lat.md/` ナレッジグラフで管理している。

## lat.md ナレッジグラフ

このプロジェクトは [lat.md](https://www.npmjs.com/package/lat.md) を使ってコードベースのナレッジグラフを管理している。規約・アーキテクチャ・ツール構成の詳細は `lat.md/` ディレクトリを参照。

### タスク開始前

- `lat search` でタスクに関連するセクションを検索し、設計意図を把握してからコードを書く
- `lat expand` でプロンプト中の `[[refs]]` を展開してコンテキストを取得する

### タスク完了後（必須 — スキップ禁止）

- [ ] 機能・アーキテクチャ・テスト・動作を変更・追加した場合は `lat.md/` を更新する
- [ ] `lat check` を実行し、すべてのwikiリンクとコード参照が通ることを確認する

### lat コマンド

```bash
lat locate "Section Name"      # セクションを名前で検索（完全一致・ファジー）
lat refs "file#Section"        # セクションへの参照を検索
lat search "natural language"  # 全セクションをセマンティック検索
lat expand "user prompt text"  # [[refs]] をロケーションに展開
lat check                      # すべてのリンクとコード参照を検証
```

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

### Storybook MCP

- UI コンポーネントや Storybook の変更時は、まず `portfolio-storybook` MCP を使って既存コンポーネントの docs / stories を確認する
- props や variant 名は推測せず、MCP の documentation / story 情報で確認できたものだけを使う
- story を追加・修正する前に、必要なら story instructions を参照して現在の Storybook 運用に合わせる
- UI 変更後は必要に応じて Storybook 側の story tests を実行し、結果を確認する
