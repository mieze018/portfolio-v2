import { within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Floater } from './Floater'

const meta: Meta<typeof Floater> = { component: Floater }
export default meta
type Story = StoryObj<typeof Floater>

export const Default: Story = { args: { children: 'Floater' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const body = within(canvasElement.parentNode as HTMLElement) // 内容がPortalなのでルートの親から探す
}
