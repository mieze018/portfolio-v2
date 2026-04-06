import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { PageObject } from 'libs/@type/api/notion'
import { WorkExperience } from './WorkExperience'

const meta: Meta<typeof WorkExperience> = {
  component: WorkExperience,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof WorkExperience>

// ダミーのPageObjectデータ
const mockGenres: PageObject[] = [
  {
    id: 'genre-1',
    properties: {
      genreName: {
        type: 'title',
        title: [{ plain_text: 'Web開発' }],
      },
    },
  } as PageObject,
  {
    id: 'genre-2',
    properties: {
      genreName: {
        type: 'title',
        title: [{ plain_text: 'モバイルアプリ開発' }],
      },
    },
  } as PageObject,
]

const mockWorkExperience: PageObject[] = [
  {
    id: 'work-1',
    properties: {
      genre: {
        type: 'relation',
        relation: [{ id: 'genre-1' }],
      },
      title: {
        type: 'title',
        title: [{ plain_text: 'サンプルプロジェクトA' }],
      },
      date: {
        type: 'date',
        date: { start: '2024-01-01' },
      },
    },
  } as PageObject,
  {
    id: 'work-2',
    properties: {
      genre: {
        type: 'relation',
        relation: [{ id: 'genre-2' }],
      },
      title: {
        type: 'title',
        title: [{ plain_text: 'サンプルプロジェクトB' }],
      },
      date: {
        type: 'date',
        date: { start: '2023-06-01' },
      },
    },
  } as PageObject,
]

export const Default: Story = {
  args: {
    workExperience: mockWorkExperience,
    genres: mockGenres,
  },
}

export const EmptyState: Story = {
  args: {
    workExperience: [],
    genres: [],
  },
}
