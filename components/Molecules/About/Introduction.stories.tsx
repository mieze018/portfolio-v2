import type { Meta, StoryObj } from '@storybook/nextjs'
import { Introduction } from './Introduction'

const meta: Meta<typeof Introduction> = {
  component: Introduction,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Introduction>

export const Default: Story = {}
