import type { Meta, StoryObj } from '@storybook/nextjs'
import { Nav } from './Nav'

const meta: Meta<typeof Nav> = {
  component: Nav,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = {
  args: {
    children: 'ナビゲーション要素',
  },
}

export const Footer: Story = {
  args: {
    footer: true,
    children: 'フッターナビゲーション',
  },
}
