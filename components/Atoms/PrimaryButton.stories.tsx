import type { Meta, StoryObj } from '@storybook/nextjs'
import { PrimaryButton } from './PrimaryButton'

const meta: Meta<typeof PrimaryButton> = {
  component: PrimaryButton,
  parameters: {},
}
export default meta
type Story = StoryObj<typeof PrimaryButton>

export const Default: Story = {
  args: {
    children: 'Primary Button',
  },
}

export const Hover: Story = {
  ...Default,
  parameters: { pseudo: { hover: true } },
}

export const Focus: Story = {
  ...Default,
  parameters: { pseudo: { focus: true } },
}

export const Active: Story = {
  ...Default,
  parameters: { pseudo: { active: true } },
}

export const Mobile: Story = {
  ...Default,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
