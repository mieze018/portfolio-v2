import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
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

export const Hover = { ...Default, parameters: { pseudo: { hover: true } } }
export const Focus = { ...Default, parameters: { pseudo: { focus: true } } }
export const Active = { ...Default, parameters: { pseudo: { active: true } } }
export const FocusVisible = { ...Default, parameters: { pseudo: { focusVisible: true } } }
