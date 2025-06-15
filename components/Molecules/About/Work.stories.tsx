import type { Meta, StoryObj } from '@storybook/nextjs'
import { Work } from './Work'
import type { PageObject } from 'libs/@type/api/notion'

const meta: Meta<typeof Work> = {
  component: Work,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Work>

// ダミーのWorkデータ
const mockWork: PageObject = {
  id: 'work-1',
  properties: {
    title: {
      type: 'title',
      title: [{ plain_text: 'サンプルプロジェクト' }],
    },
    author: {
      type: 'select',
      select: { name: 'John Doe' },
    },
    format: {
      type: 'select',
      select: { name: 'Webアプリケーション' },
    },
    date: {
      type: 'date',
      date: { start: '2023-01-01' },
    },
    designer: {
      type: 'select',
      select: { name: 'Design Studio' },
    },
    url: {
      type: 'url',
      url: 'https://example.com',
    },
    publisher: {
      type: 'select',
      select: { name: 'Tech Company' },
    },
  },
} as PageObject

export const Default: Story = {
  args: {
    work: mockWork,
  },
}
