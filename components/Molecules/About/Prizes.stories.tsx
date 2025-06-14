import type { Meta, StoryObj } from '@storybook/nextjs'
import { Prizes } from './Prizes'
import type { PageObject } from 'libs/@type/api/notion'

const meta: Meta<typeof Prizes> = {
  component: Prizes,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Prizes>

const mockPrizes: PageObject[] = [
  {
    id: 'prize-1',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: 'ハッカソン2023' }],
      },
      prizeName: {
        type: 'rich_text',
        rich_text: [{ plain_text: '最優秀賞' }],
      },
      date: {
        type: 'date',
        date: { start: '2023-06-15' },
      },
    },
  } as PageObject,
  {
    id: 'prize-2',
    properties: {
      title: {
        type: 'title',
        title: [{ plain_text: 'デザインコンペ' }],
      },
      prizeName: {
        type: 'rich_text',
        rich_text: [{ plain_text: '優秀賞' }],
      },
      date: {
        type: 'date',
        date: { start: '2022-12-01' },
      },
    },
  } as PageObject,
]

export const Default: Story = {
  args: {
    prizes: mockPrizes,
  },
}

export const EmptyPrizes: Story = {
  args: {
    prizes: [],
  },
}
