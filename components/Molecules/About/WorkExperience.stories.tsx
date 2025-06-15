import type { Meta, StoryObj } from '@storybook/nextjs'
import { WorkExperience } from './WorkExperience'
import type { PageObject } from 'libs/@type/api/notion'

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
    },
  } as PageObject,
  {
    id: 'work-2',
    properties: {
      genre: {
        type: 'relation',
        relation: [{ id: 'genre-2' }],
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
