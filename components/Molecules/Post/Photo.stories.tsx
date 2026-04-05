import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { Tumblr } from 'libs/@type/api/tumblr'
import { userEvent } from 'storybook/test'
import { Photo } from './Photo'

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

type StoryPlayContext = Parameters<NonNullable<Story['play']>>[0]

/** handleOpenPhoto をカバーするためクリック操作を実行する */
export const ClickToOpen: Story = {
  args: {
    photo: mockPhoto,
    isColumn: false,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const button = canvasElement.querySelector('button')
    if (button) {
      await userEvent.click(button)
    }
  },
}
