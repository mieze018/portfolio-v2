import type { Meta, StoryObj } from '@storybook/nextjs'
import { PostFooter } from './PostFooter'

const meta: Meta<typeof PostFooter> = {
  component: PostFooter,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof PostFooter>

export const Default: Story = {
  args: {
    postDate: '2024-01-15 12:00:00 GMT',
  },
}
