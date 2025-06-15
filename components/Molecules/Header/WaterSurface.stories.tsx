import type { Meta, StoryObj } from '@storybook/nextjs'
import { WaterSurface } from './WaterSurface'

const meta: Meta<typeof WaterSurface> = {
  component: WaterSurface,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
  },
  tags: ['motion'],
}
export default meta
type Story = StoryObj<typeof WaterSurface>

export const Default: Story = {}
