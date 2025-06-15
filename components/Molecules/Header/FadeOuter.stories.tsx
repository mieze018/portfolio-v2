import type { Meta, StoryObj } from '@storybook/nextjs'
import { FadeOuter } from './FadeOuter'
import { expect, waitFor, fireEvent } from 'storybook/test'
const meta: Meta<typeof FadeOuter> = {
  component: FadeOuter,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
  tags: ['motion'],
} satisfies Meta<typeof FadeOuter>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ width: '100%', height: '200vh' }} data-testid="scroll-content">
        <h1>タイトル</h1>
        <p>説明文</p>
      </div>
    ),
  },

  play: async ({ canvas }) => {
    const htmlElement = document.documentElement
    // スクロールテストのための要素を取得
    const scrollContent = canvas.getByTestId('scroll-content')

    // 要素が不透明であることを確認
    await expect(scrollContent).toBeVisible()

    // htmlをスクロールダウン
    await waitFor(async () => {
      fireEvent.scroll(htmlElement, {
        target: { scrollTop: 10000 },
      })
      expect(htmlElement.scrollTop).toBeGreaterThan(100)
    })

    // スクロール後に要素が透明であることを確認
    await waitFor(async () => {
      expect(scrollContent).not.toBeVisible()
    })

    //スクロール位置を戻す

    await waitFor(async () => {
      fireEvent.scroll(htmlElement, {
        target: { scrollTop: 0 },
      })
      expect(htmlElement.scrollTop).toBe(0)
    })
  },
}
