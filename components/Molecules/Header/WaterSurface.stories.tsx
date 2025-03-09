import { within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { WaterSurface } from './WaterSurface'

const meta: Meta<typeof WaterSurface> = { component: WaterSurface }
export default meta
type Story = StoryObj<typeof WaterSurface>

export const Default: Story = { args: { children: 'WaterSurface' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const body = within(canvasElement.parentNode as HTMLElement) // 内容がPortalなのでルートの親から探す
}

export const Hover = { ...Default, parameters: { pseudo: { hover: true } } }
export const Focus = { ...Default, parameters: { pseudo: { focus: true } } }
export const Active = { ...Default, parameters: { pseudo: { active: true } } }
export const FocusVisible = { ...Default, parameters: { pseudo: { focusVisible: true } } }
