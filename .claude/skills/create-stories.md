---
name: create-stories
description: コンポーネントの .stories.tsx と .mdx を生成する。コンポーネントファイルのパスを渡すと、同ディレクトリに Storybook ファイルを作成する。既存ファイルがあればスキップする。
user_invocable: true
---

# Storybook ファイル生成スキル

コンポーネントの `.stories.tsx` と `.mdx` を生成する。

## 使い方

```
/create-stories components/Atoms/MyComponent.tsx
```

引数がない場合はユーザーに対象コンポーネントのパスを聞く。

## 手順

1. 引数からコンポーネントのパスを取得する
2. コンポーネントファイルを Read で読み、以下を確認する:
   - export されているコンポーネント名（named export のみ）
   - Props の型定義
   - コンポーネントの責務（Atoms / Molecules / Organisms / Layout）
3. 同ディレクトリに `.stories.tsx` が既に存在する場合はスキップ（ユーザーに報告）
4. 同ディレクトリに `.mdx` が既に存在する場合はスキップ（ユーザーに報告）
5. 以下のテンプレートを元に、コンポーネントの内容に合わせてファイルを生成する

## .stories.tsx テンプレート

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ComponentName } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
}
export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: {
    // Props に合わせて適切なデフォルト値を入れる
  },
}

export const Hover: Story = {
  ...Default,
  parameters: { pseudo: { hover: true } },
}

export const Focus: Story = {
  ...Default,
  parameters: { pseudo: { focus: true } },
}

export const Active: Story = {
  ...Default,
  parameters: { pseudo: { active: true } },
}

export const FocusVisible: Story = {
  ...Default,
  parameters: { pseudo: { focusVisible: true } },
}

export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
```

## .mdx テンプレート

```mdx
import { Meta, ArgTypes } from '@storybook/addon-docs/blocks'
import { ComponentName } from './ComponentName'
import * as ComponentNameStories from './ComponentName.stories'

<Meta of={ComponentNameStories} />

# ComponentName

コンポーネントの説明（コードから読み取った責務を日本語で書く）

<ArgTypes of={ComponentName} />
```

## 規約（必ず守ること）

- `import type` を使う（型のインポート）
- `@storybook/nextjs-vite` からインポートする
- シングルクォート、セミコロンなし、インデント スペース2
- default export は `meta` 変数経由のみ（Stories の CSF3 仕様で必要なため）
- コンポーネント自体は named export のみ
- コメントは日本語
- Props の内容を読んで、意味のあるデフォルト値を args に設定する
- Atoms は疑似クラス状態（Hover/Focus/Active/FocusVisible）を必ず含める
- Molecules/Organisms は主要なバリエーション（Props の組み合わせ）をストーリーとして追加する
- Layout コンポーネントは `parameters: { layout: 'fullscreen' }` を付ける
- アニメーションを含むコンポーネントは `parameters: { chromatic: { disableSnapshot: true } }` を検討する
- MDX の説明文はコンポーネントのコードから読み取った責務を簡潔に日本語で書く
