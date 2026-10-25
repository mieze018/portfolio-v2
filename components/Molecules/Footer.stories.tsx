import type { Meta, StoryObj } from '@storybook/react-vite'
import { mockSocialLinks } from 'libs/test/mockSocialLinks'
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

export const Default: Story = {
  args: {
    socialLinks: mockSocialLinks,
  },
}
