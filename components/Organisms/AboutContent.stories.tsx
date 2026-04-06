import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Default as mockEvents } from 'components/Molecules/About/Events.stories'
import { Default as PrizesDefault } from 'components/Molecules/About/Prizes.stories'
import { Default as WorkDefault } from 'components/Molecules/About/WorkExperience.stories'
import type { PageObject } from 'libs/@type/api/notion'
import { mockSocialLinks } from 'libs/test/mockSocialLinks'
import { AboutContent } from './AboutContent'

const meta: Meta<typeof AboutContent> = { component: AboutContent }
export default meta
type Story = StoryObj<typeof AboutContent>

export const Default: Story = {
  args: {
    socialLinks: mockSocialLinks,
    fallbackData: {
      prizes: PrizesDefault.args?.prizes as PageObject[],
      workExperience: WorkDefault.args?.workExperience as PageObject[],
      workExperienceGenre: WorkDefault.args?.genres as PageObject[],
      events: mockEvents.args?.events as PageObject[],
    },
  },
}
export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}

/**
 * events / workExperience / socialLinks が空配列の場合。
 * 条件分岐（!!array?.length）の falsy パスをカバーする。
 */
export const WithEmptyData: Story = {
  args: {
    socialLinks: [],
    fallbackData: {
      prizes: [],
      workExperience: [],
      workExperienceGenre: [],
      events: [],
    },
  },
}
export const Loading: Story = {
  args: {
    socialLinks: [],
    fallbackData: undefined,
  },
}
