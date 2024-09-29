import type { Meta, StoryObj } from '@storybook/react'
import { Photo } from './Photo'

const meta: Meta<typeof Photo> = { component: Photo }
export default meta
type Story = StoryObj<typeof Photo>

export const Default: Story = {
  args: {
    photo: {
      caption: 'caption',
      original_size: {
        url: 'https://placehold.jp/800x600.png',
        height: 600,
        width: 800,
      },
      alt_sizes: [
        {
          url: 'https://placehold.jp/100x100.png',
          height: 100,
          width: 100,
        },
      ],
    },
  },
}
export const Column: Story = {
  ...Default,
  args: {
    ...Default.args,
    isColumn: true,
  },
}
