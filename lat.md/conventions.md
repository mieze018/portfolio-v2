# Conventions

コーディング規約の全体。命名規則・コンポーネント設計・TypeScript ルール・コメントスタイルを定める。

## Naming

ファイル・ディレクトリの命名規則。大文字小文字を後から変更するとサーバーで認識されないため、最初から正しいケースで作成する。

| 対象 | ケース | 例 |
| --- | --- | --- |
| `pages/` 以下のルーティングファイル | スネークケース（URLパスに準じる） | `about_me.tsx` |
| React コンポーネント（`.tsx`）とそのディレクトリ | パスカルケース | `PrimaryButton.tsx` |
| メソッド・型（`.ts`）・設定ファイル | キャメルケース | `useModalControl.ts` |

## Components

コンポーネントの書き方。default export を避け named export に統一することで、import 時のリネームによるトレーサビリティ低下を防ぐ。

### Export Style

Named export のみ使用する。default export は使わない。

```tsx
// ✅
export const PrimaryButton = () => { ... }

// ❌
export default PrimaryButton
```

### No Index Files

`index.ts` は作らない。ファイルパスで直接 import することで、どのファイルを使っているか明示する。

### Props Types

Props の型定義規約。基本は `type`、外部ライブラリの拡張時のみ `interface` を使う。
- 型名は `lowerCamelCase + Type` サフィックス（プロジェクト独自の規約）

```tsx
// ✅ 通常のProps
type eventItemType = {
  title: string
  date: string | number
}

// ✅ 外部ライブラリを拡張するとき
interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {
  className?: string
}
```

## TypeScript and Biome

TypeScript と Biome に関するルール。`import type` の強制など Biome の strict ルールに従う。

### Import Type

型のみの import は必ず `import type { ... }` を使う（`useImportType: "error"`）。

```ts
// ✅
import type { ReactNode } from 'react'

// ❌
import { ReactNode } from 'react'
```

### Style Rules

Biome のフォーマットルール。すべてのファイルでこのスタイルに統一する。

- シングルクォート
- セミコロンなし
- 末尾カンマ ES5 スタイル
- インデント スペース2
- 最大行長 100

### Unused Imports and Variables

未使用の import や変数は CI で検出される。

- 未使用 import は error
- 未使用変数は warn

## Comments

コメントは**日本語**で記述する。「何をしているか」より**Why（なぜそうしているか）**を優先して書く。

Biome ルールを意図的に無視するときは理由も添える。

```ts
// Why: ここに理由を書く
// biome-ignore lint/suspicious/noExplicitAny: 理由
```
