import { within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { TopBar } from './TopBar'

const meta: Meta<typeof TopBar> = { component: TopBar }
export default meta
type Story = StoryObj<typeof TopBar>

export const Default: Story = { args: { children: 'TopBar' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const body = within(canvasElement.parentNode as HTMLElement) // 内容がPortalなのでルートの親から探す
}
