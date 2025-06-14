import type { Meta, StoryObj } from '@storybook/react'
import { Photos } from './Photos'
import type { Tumblr } from 'libs/@type/api/tumblr'

const meta: Meta<typeof Photos> = {
  component: Photos,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Photos>

const testImage1 = 'https://picsum.photos/id/1/400/300'
const testImage2 = 'https://picsum.photos/id/2/400/300'
const testImage3 = 'https://picsum.photos/id/3/400/300'

const mockPhotos: Tumblr.Photo[] = [
  {
    caption: '',
    original_size: {
      url: testImage1,
      width: 400,
      height: 300,
    },
    alt_sizes: [],
  },
  {
    caption: '',
    original_size: {
      url: testImage2,
      width: 400,
      height: 300,
    },
    alt_sizes: [],
  },
  {
    caption: '',
    original_size: {
      url: testImage3,
      width: 400,
      height: 300,
    },
    alt_sizes: [],
  },
]

export const Default: Story = {
  args: {
    photos: mockPhotos,
  },
}

export const ColumnLayout: Story = {
  args: {
    photos: mockPhotos,
    isColumn: true,
  },
}

export const ShowOnlyLastPhoto: Story = {
  args: {
    photos: mockPhotos,
    isShowOnlyLastPhoto: true,
  },
}

export const SinglePhoto: Story = {
  args: {
    photos: [mockPhotos[0]],
  },
}
