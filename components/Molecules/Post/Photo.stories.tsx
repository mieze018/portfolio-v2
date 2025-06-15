import type { Meta, StoryObj } from '@storybook/nextjs'
import { Photo } from './Photo'
import type { Tumblr } from 'libs/@type/api/tumblr'

const meta: Meta<typeof Photo> = {
  component: Photo,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Photo>

const testImage = 'https://picsum.photos/id/4/800/600'

const mockPhoto: Tumblr.Photo = {
  caption: 'Sample photo caption',
  original_size: {
    url: testImage,
    width: 800,
    height: 600,
  },
  alt_sizes: [],
}

export const Default: Story = {
  args: {
    photo: mockPhoto,
    isColumn: false,
  },
}

export const ColumnLayout: Story = {
  args: {
    photo: mockPhoto,
    isColumn: true,
  },
}
