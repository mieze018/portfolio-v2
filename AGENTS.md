# AGENTS.md

このプロジェクトのルール・規約の原本は Storybook ドキュメント（components/Introduction.mdx）と lat.md ナレッジグラフで管理している。

## 参照先

このプロジェクトは lat.md を使ってコードベースのナレッジグラフを管理している。詳細な規約は以下を参照すること。

- lat.md/conventions.md — 命名規則・コンポーネント設計・TypeScript ルール
- lat.md/styling.md — Tailwind CSS v4 + CVA によるスタイリング規約
- lat.md/architecture.md — ディレクトリ構造と Atomic Design の境界線
- lat.md/tooling.md — Biome・Husky・テスト・CI 構成
- components/Introduction.mdx — Storybook 上の原本ドキュメント

## lat.md の扱い

### タスク開始前

- lat search でタスクに関連するセクションを検索し、設計意図を把握してからコードを書く
- プロンプトに [[refs]] がある場合は lat expand で展開してから着手する
- lat search が API キー未設定で使えない場合は lat locate を代替で使う

### タスク完了前

- 機能・アーキテクチャ・テスト・動作を変更した場合は lat.md/ を更新する
- lat check を実行し、wiki link とコード参照の整合性を確認する

### よく使うコマンド

```bash
lat locate "Section Name"
lat refs "file#Section"
lat search "natural language"
lat expand "user prompt text"
lat check
```

## Storybook

- UI コンポーネントや Storybook の変更時は、まず portfolio-storybook MCP で既存コンポーネントの docs / stories を確認する
- props や variant 名は推測せず、documentation / story 情報で確認できたものだけを使う
- story を追加・修正する前に、必要なら story instructions を参照する
- UI 変更後は必要に応じて Storybook 側の story tests を実行して結果を確認する

## Graphify

このプロジェクトには graphify-out/ に Graphify ナレッジグラフがある。

- アーキテクチャやコードベースの質問に答える前に graphify-out/GRAPH_REPORT.md を確認する
- graphify-out/wiki/index.md がある場合は、生ファイル探索より先にそちらを使う
- コードファイルを変更したら graphify update . を実行してグラフを更新する
