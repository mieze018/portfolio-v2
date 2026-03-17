import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/nextjs-vite'
import * as previewAnnotations from './preview'

// Why: Storybook のグローバル設定（preview.ts）と a11y アドオンの設定を
// Vitest テスト環境にも適用する。これにより story テストが Storybook 表示時と
// 同じ条件で実行される。
setProjectAnnotations([previewAnnotations, a11yAddonAnnotations])
