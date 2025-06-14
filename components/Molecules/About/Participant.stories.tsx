import type { Meta, StoryObj } from '@storybook/nextjs'
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
