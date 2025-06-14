import type { Meta, StoryObj } from '@storybook/react'
import { Participant } from './Participant'

const meta: Meta<typeof Participant> = {
  component: Participant,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Participant>

export const Default: Story = {}
