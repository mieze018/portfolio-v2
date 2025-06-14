import type { Meta, StoryObj } from '@storybook/nextjs'
import { FadeOuter } from './FadeOuter'

const meta: Meta<typeof FadeOuter> = {
  component: FadeOuter,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof FadeOuter>

export const Default: Story = {
  args: {
    children: (
      <div style={{ width: '100%', height: '100vh' }} data-testid="scroll-content">
        <h1>タイトル</h1>
        <p>説明文</p>
      </div>
    ),
  },

  // play: async ({ canvas, userEvent }) => {
  //   // スクロールテストのための要素を取得
  //   const scrollContent = canvas.getByTestId('scroll-content')

  //   // 要素が存在することを確認
  //   await expect(scrollContent).toBeInTheDocument()

  //   // スクロール前の状態
  //   const initialOpacity = getComputedStyle(
  //     scrollContent.closest('[class*="tw-"]') || scrollContent.parentElement || scrollContent
  //   ).opacity
  //   console.log('初期透明度:', initialOpacity)

  //   // 少しスクロールダウン（100px）
  //   scrollContainer.scrollTop = 100
  //   scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }))

  //   await new Promise((resolve) => setTimeout(resolve, 800)) // アニメーション完了を待つ

  //   const lightScrollOpacity = getComputedStyle(
  //     fadeTitle.closest('[class*="tw-"]') || fadeTitle.parentElement || fadeTitle
  //   ).opacity
  //   console.log('軽いスクロール後の透明度:', lightScrollOpacity)

  //   // さらにスクロールダウン（600px）
  //   scrollContainer.scrollTop = 600
  //   scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }))

  //   await new Promise((resolve) => setTimeout(resolve, 800))

  //   const deepScrollOpacity = getComputedStyle(
  //     fadeTitle.closest('[class*="tw-"]') || fadeTitle.parentElement || fadeTitle
  //   ).opacity
  //   console.log('深いスクロール後の透明度:', deepScrollOpacity)

  //   // 元に戻る（トップへスクロール）
  //   scrollContainer.scrollTop = 0
  //   scrollContainer.dispatchEvent(new Event('scroll', { bubbles: true }))

  //   await new Promise((resolve) => setTimeout(resolve, 800))

  //   const backToTopOpacity = getComputedStyle(
  //     fadeTitle.closest('[class*="tw-"]') || fadeTitle.parentElement || fadeTitle
  //   ).opacity
  //   console.log('トップに戻った後の透明度:', backToTopOpacity)

  //   console.log('=== スクロールテスト完了 ===')

  //   // 基本的なアサーション（要素が存在し続けていることを確認）
  //   await expect(fadeTitle).toBeInTheDocument()
  // },
}
