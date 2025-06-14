import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    // フッターのナビゲーションリンクとソーシャルリンクをテスト
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
