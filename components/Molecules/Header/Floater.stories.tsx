import type { Meta, StoryObj } from '@storybook/nextjs'
import { Floater } from './Floater'

const meta: Meta<typeof Floater> = {
  component: Floater,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof Floater>

export const Default: Story = {
  args: {
    children: 'フローティングヘッダー要素',
  },
}

export const WithComplexContent: Story = {
  args: {
    children: (
      <div>
        <h1>サイトタイトル</h1>
        <p>サイトの説明文がここに入ります</p>
      </div>
    ),
  },
}
