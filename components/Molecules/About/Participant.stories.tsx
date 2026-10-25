import type { Meta, StoryObj } from '@storybook/react-vite'
import { Participant } from './Participant'

const meta: Meta<typeof Participant> = {
  component: Participant,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Participant>

export const Default: Story = {}
