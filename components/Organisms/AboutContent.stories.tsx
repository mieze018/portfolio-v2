import type { Meta, StoryObj } from '@storybook/nextjs'
import { AboutContent } from './AboutContent'

const meta: Meta<typeof AboutContent> = { component: AboutContent }
export default meta
type Story = StoryObj<typeof AboutContent>

export const Default: Story = {
  args: {
    fallbackData: {
      prizes: [],
      workExperience: [],
      workExperienceGenre: [],
      events: [],
    },
  },
}
export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
