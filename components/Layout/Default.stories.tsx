import type { Meta, StoryObj } from '@storybook/react'
import Layout from './Default'

const meta: Meta<typeof Layout> = {
  component: Layout,
  parameters: {
    chromatic: { disableSnapshot: false },
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
}
