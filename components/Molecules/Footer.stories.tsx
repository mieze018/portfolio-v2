import type { Meta, StoryObj } from '@storybook/nextjs'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    // フッターのナビゲーションリンクとソーシャルリンクをテスト
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
