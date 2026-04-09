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
pages/               # Next.js Pages Router（スネークケース）
pages/api/           # データ配列の定義（型は interface を使用）
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

データ取得パターン。Notion API は `pages/api/` でまとめ、コンポーネントからは SWR または `getStaticProps` 経由で利用する。

- **静的生成**: `getStaticProps` + Notion client → ビルド時にデータを取得
- **クライアントフェッチ**: SWR + `/api/*` エンドポイント → ランタイムでデータを取得
