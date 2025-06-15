import type { Meta, StoryObj } from '@storybook/nextjs'
import { expect, waitFor } from 'storybook/test'
import Layout from './Default'

const meta: Meta<typeof Layout> = {
  component: Layout,
  parameters: {
    chromatic: { disableSnapshot: true }, // アニメーション結果が安定しないので無効化
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>サンプルページコンテンツ</h1>
        <p>ここにメインコンテンツが入ります。</p>
        <p>ヘッダーとフッターがレイアウトに含まれます。</p>
      </div>
    ),
  },
}

export const WithLongContent: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h1>長いコンテンツのページ</h1>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h2>セクション {i + 1}</h2>
            <p>
              これは長いコンテンツのサンプルです。スクロール動作やレイアウトの確認のために
              複数のセクションを配置しています。レスポンシブデザインの確認もできます。
            </p>
            <p>
              追加の段落です。このような長いコンテンツでも適切にレイアウトされることを
              確認するためのテキストです。
            </p>
          </div>
        ))}
      </div>
    ),
  },

  play: async ({ canvas }) => {
    const htmlElement = document.documentElement
    // 初期状態でTopBarが存在することを確認
    const topBar = canvas.getByRole('banner')
    await expect(topBar).toBeInTheDocument()

    // ページをスクロールダウン（window.scrollToを使用）
    htmlElement.scrollTo({ top: 500, behavior: 'smooth' })
    // スクロール完了を待機
    await waitFor(async () => expect(htmlElement.scrollTop).toBeGreaterThan(450))

    // navが画面上部に固定されていることを確認
    const navs = canvas.getAllByRole('navigation')
    const topNav = navs[0]
    await waitFor(() => {
      expect(topNav.getBoundingClientRect().top).toBeLessThanOrEqual(10)
      expect(topNav.getBoundingClientRect().top).toBeGreaterThan(0)
    })

    // 最後にページトップに戻る
    htmlElement.scrollTo({ top: 0, behavior: 'smooth' })
    await new Promise((resolve) => setTimeout(resolve, 300))
    // スクロール完了を待機
    await waitFor(async () => expect(htmlElement.scrollTop).toBe(0))

    // navが画面上部にないことを確認
    await waitFor(async () => expect(topNav.getBoundingClientRect().top).toBeGreaterThan(100))
  },
  parameters: {
    chromatic: { disableSnapshot: true }, // スクロール状態のスナップショットは無効化
  },
}
