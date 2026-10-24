# Architecture

ディレクトリ構造と Atomic Design の境界線を定義する。設計思想の詳細は [[conventions]] を参照。

## Directory Structure

プロジェクトルートの主要ディレクトリと役割。

```
components/          # UI コンポーネント（Atomic Design）
├── Atoms/           # 最小UIパーツ（HTMLタグの置き換えレベル）
├── Molecules/       # 複数Atomsの組み合わせ＋簡単なロジック
├── Organisms/       # ページスケールのUI＋複雑なロジック
└── Layout/          # ページ全体レイアウトテンプレート

libs/                # メソッド・型・i18nなど
src/pages/           # Astro の静的ルート
src/layouts/         # HTML・メタデータ・フォント・ページ遷移
libs/content.ts      # ビルド用データ取得
libs/site.ts         # サイト情報
public/              # 静的アセット
styles/              # グローバルCSS
tests/               # テスト補助ファイル
```

## Atomic Design Boundaries

コンポーネントをどの層に置くかの判断基準。

- **Atoms**: `tw()` + `cva()` で定義されるスタイル付きコンポーネント。外部UIライブラリの re-export も含む
- **Molecules**: Atoms の組み合わせ。フォームやリストアイテムなど、簡単なビジネスロジックを持つ
- **Organisms**: Molecules を複数組み合わせた自己完結したユニット。データ取得・フックも持つ
- **Layout**: `children` を受け取る共通ページテンプレート

## Data Flow

[[libs/content.ts]] が Notion / Tumblr をビルド時に取得し、[[src/pages/[...path].astro]] の
getStaticPaths で既存URLと投稿詳細を生成する。追加投稿はコード変更なしで再ビルド時に反映する。
認証情報を読む [[libs/notion.ts]] / [[libs/tumblr.ts]] は React から import しない。
表示用のプロパティ取得は純粋関数 [[libs/notionProperties.ts]] へ分離する。

[[components/Portfolio.tsx]] は共有 Jotai Provider を持つ React island。
Astro ClientRouter が island を永続化し、遷移先の props を更新する。
画像モーダル・React の遷移アニメーション・ナビゲーションを同じ状態で扱う。
リンクは標準の a 要素、画像は Tumblr の alt_sizes を使う img 要素。

fixtures モードだけ [[libs/test/fixtureContent.ts]] を使う。本番でAPIが失敗したときは
ビルドを止め、テストデータを自動で代用しない。セットアップは [[tooling]] を参照。
