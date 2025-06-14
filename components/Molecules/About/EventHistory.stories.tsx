import type { Meta, StoryObj } from '@storybook/react'
import { EventHistory } from './EventHistory'
import type { PageObject } from 'libs/@type/api/notion'

const meta: Meta<typeof EventHistory> = {
  component: EventHistory,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof EventHistory>

// 過去の日付（テスト用）
const pastDate1 = new Date()
pastDate1.setFullYear(pastDate1.getFullYear() - 1)

const pastDate2 = new Date()
pastDate2.setFullYear(pastDate2.getFullYear() - 2)

// 未来の日付（テスト用）
const futureDate = new Date()
futureDate.setMonth(futureDate.getMonth() + 1)

const mockEvents: PageObject[] = [
  {
    id: 'event-1',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: '過去の技術カンファレンス' }],
      },
      place: {
        type: 'select',
        select: { name: '東京' },
      },
      date: {
        type: 'date',
        date: { start: pastDate1.toISOString().split('T')[0] },
      },
      url: {
        type: 'url',
        url: 'https://example.com/past-event1',
      },
      description: {
        type: 'rich_text',
        rich_text: [{ plain_text: '過去に開催された技術イベント' }],
      },
    },
  } as PageObject,
  {
    id: 'event-2',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: '古いワークショップ' }],
      },
      place: {
        type: 'select',
        select: { name: '大阪' },
      },
      date: {
        type: 'date',
        date: { start: pastDate2.toISOString().split('T')[0] },
      },
    },
  } as PageObject,
  {
    id: 'event-3',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: '未来のイベント' }],
      },
      place: {
        type: 'select',
        select: { name: '未来の会場' },
      },
      date: {
        type: 'date',
        date: { start: futureDate.toISOString().split('T')[0] },
      },
    },
  } as PageObject,
]

export const Default: Story = {
  args: {
    events: mockEvents,
  },
}

export const NoPastEvents: Story = {
  args: {
    events: [mockEvents[2]], // 未来のイベントのみ
  },
}

export const EmptyEvents: Story = {
  args: {
    events: [],
  },
}
