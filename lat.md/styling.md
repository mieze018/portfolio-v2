# Styling

Tailwind CSS v4 + CVA（class-variance-authority）を組み合わせたスタイリング規約。ユーティリティ関数は [[libs/tw-clsx-util.ts]] に定義されている。

## Utility Functions

| 関数 | 用途 |
| --- | --- |
| `tw(tag, cva(...))` | HTML 要素にスタイルを付ける |
| `twe(Component, cva(...))` | React コンポーネントにスタイルを付ける |
| `cva(...)` | バリアントを定義する |
| `cn(...classes)` | クラス名をマージする（clsx + tailwind-merge） |

## Usage Examples

基本的な使い方。バリアントが必要な場合は `cva` で定義し、`tw` や `twe` に渡す。

```tsx
// HTML要素
export const Center = tw('div', cva('m-auto flex items-center justify-center'))

// バリアント付き
const imageVariants = cva('mx-auto cursor-pointer', {
  variants: {
    size: { sm: 'w-8 h-8', md: 'w-16 h-16' },
  },
})
export const Image = tw('img', imageVariants)

// React コンポーネントにスタイルを付ける
export const StyledButton = twe(Button, cva('rounded px-4 py-2'))

// クラスをマージ
className={cn('base-class', isActive && 'active-class')}
```

## Class Merging

競合するクラスをマージするときは `cn` を使う。`clsx` と `tailwind-merge` を組み合わせて条件付きクラスを安全に結合できる。
