import type { Meta, StoryObj } from '@storybook/nextjs'
import { Linktree } from './Linktree'
import type { LocalApi } from 'libs/@type/api/local'

const meta: Meta<typeof Linktree> = {
  component: Linktree,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Linktree>

const mockLinks: LocalApi.SnsLink[] = [
  {
    text: 'Twitter',
    url: 'https://twitter.com/example',
  },
  {
    text: 'GitHub',
    url: 'https://github.com/example',
  },
  {
    text: 'LinkedIn',
    url: 'https://linkedin.com/in/example',
    mobileLUrl: 'https://m.linkedin.com/in/example',
  },
]

export const Default: Story = {
  args: {
    links: mockLinks,
  },
}

export const EmptyLinks: Story = {
  args: {
    links: [],
  },
}

export const SingleLink: Story = {
  args: {
    links: [mockLinks[0]],
  },
}
