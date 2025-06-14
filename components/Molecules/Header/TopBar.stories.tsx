import type { Meta, StoryObj } from '@storybook/react'
import { TopBar } from './TopBar'

const meta: Meta<typeof TopBar> = {
  component: TopBar,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof TopBar>

export const Default: Story = {}
