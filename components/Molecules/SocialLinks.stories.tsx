import type { Meta, StoryObj } from '@storybook/nextjs'
import { SocialLinks } from './SocialLinks'

const meta: Meta<typeof SocialLinks> = {
  component: SocialLinks,
  parameters: {
    // ソーシャルメディアリンクのレイアウトをテスト
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof SocialLinks>

export const Default: Story = {}
