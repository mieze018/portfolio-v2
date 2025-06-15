import type { Meta, StoryObj } from '@storybook/nextjs'
import { EventItem } from './EventItem'

const meta: Meta<typeof EventItem> = {
  component: EventItem,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof EventItem>

export const Default: Story = {
  args: {
    title: '技術カンファレンス2024',
    date: '2024-12-15',
    place: '東京ビッグサイト',
    url: 'https://example.com/event',
    description: '最新技術について学ぶイベントです。多くの著名な講演者が登壇予定です。',
  },
}

export const MinimalInfo: Story = {
  args: {
    title: 'ミニマルイベント',
    date: '2024-11-01',
    place: '渋谷',
    url: '',
    description: '',
  },
}

export const LongDescription: Story = {
  args: {
    title: '長い説明があるイベント',
    date: '2024-10-20',
    place: 'オンライン',
    url: 'https://example.com/long-event',
    description:
      'これは非常に長い説明を持つイベントです。このイベントでは様々なトピックについて詳しく学ぶことができ、参加者同士の交流も盛んに行われます。技術的な内容から実践的なワークショップまで幅広くカバーしています。',
  },
}
