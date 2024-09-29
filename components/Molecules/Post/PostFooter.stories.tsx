import type { Meta, StoryObj } from '@storybook/react'
import { PostFooter } from './PostFooter'

const meta: Meta<typeof PostFooter> = { component: PostFooter }
export default meta
type Story = StoryObj<typeof PostFooter>

export const Default: Story = {
  args: {
    postDate: '2021-01-01 00:00:00 GMT',
  },
}
