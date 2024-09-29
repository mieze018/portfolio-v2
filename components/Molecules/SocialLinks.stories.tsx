import { within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { SocialLinks } from './SocialLinks'

const meta: Meta<typeof SocialLinks> = { component: SocialLinks }
export default meta
type Story = StoryObj<typeof SocialLinks>

export const Default: Story = { args: { children: 'SocialLinks' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const body = within(canvasElement.parentNode as HTMLElement) // 内容がPortalなのでルートの親から探す
}

export const Hover = { ...Default, parameters: { pseudo: { hover: true } } }
export const Focus = { ...Default, parameters: { pseudo: { focus: true } } }
export const Active = { ...Default, parameters: { pseudo: { active: true } } }
export const FocusVisible = { ...Default, parameters: { pseudo: { focusVisible: true } } }
