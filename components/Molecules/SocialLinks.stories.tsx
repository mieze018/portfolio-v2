import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { mockSocialLinks } from 'libs/test/mockSocialLinks'
import { SocialLinks } from './SocialLinks'

const meta: Meta<typeof SocialLinks> = {
  component: SocialLinks,
  parameters: {
    // ソーシャルメディアリンクのレイアウトをテスト
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof SocialLinks>

export const Default: Story = {
  args: {
    links: mockSocialLinks,
  },
}

export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
