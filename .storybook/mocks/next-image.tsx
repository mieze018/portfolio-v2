import React from 'react'

// Why: @storybook/nextjs-vite の NextImage モックが Vitest ブラウザ環境で
// object として解決される問題を回避するための軽量モック。
// Storybook UI 側は正常に動作するが、Vitest + Playwright の環境では
// ESM 解決が異なるためこちらを使う。
const MockImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean
    priority?: boolean
    quality?: number
    placeholder?: string
    blurDataURL?: string
    loader?: unknown
  }
>(({ fill, priority, quality, placeholder, blurDataURL, loader, ...props }, ref) => {
  // biome-ignore lint/performance/noImgElement: next/image のテスト用モックなので素の img を意図的に使用
  // biome-ignore lint/a11y/useAltText: alt は呼び出し側から props 経由で渡される
  return <img ref={ref} {...props} />
})

MockImage.displayName = 'NextImage'

export default MockImage
