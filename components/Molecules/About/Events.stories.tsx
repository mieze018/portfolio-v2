import type { Meta, StoryObj } from '@storybook/nextjs'
import { Events } from './Events'
import type { PageObject } from 'libs/@type/api/notion'

const meta: Meta<typeof Events> = {
  component: Events,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Events>

// 未来の日付（テスト用）
const futureDate = new Date()
futureDate.setMonth(futureDate.getMonth() + 1)

// 過去の日付（テスト用）
const pastDate = new Date()
pastDate.setMonth(pastDate.getMonth() - 1)

const mockEvents: PageObject[] = [
  {
    id: 'event-1',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: '技術カンファレンス2024' }],
      },
      place: {
        type: 'select',
        select: { name: '東京ビッグサイト' },
      },
      date: {
        type: 'date',
        date: { start: futureDate.toISOString().split('T')[0] },
      },
      url: {
        type: 'url',
        url: 'https://example.com/event1',
      },
      description: {
        type: 'rich_text',
        rich_text: [{ plain_text: '最新技術について学ぶイベントです' }],
      },
    },
  } as PageObject,
  {
    id: 'event-2',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: '過去のイベント' }],
      },
      place: {
        type: 'select',
        select: { name: '渋谷' },
      },
      date: {
        type: 'date',
        date: { start: pastDate.toISOString().split('T')[0] },
      },
    },
  } as PageObject,
]

export const Default: Story = {
  args: {
    events: mockEvents,
  },
}

export const NoFutureEvents: Story = {
  args: {
    events: [mockEvents[1]], // 過去のイベントのみ
  },
}

export const EmptyEvents: Story = {
  args: {
    events: [],
  },
}
