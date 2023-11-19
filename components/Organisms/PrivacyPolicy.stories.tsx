import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import type { Meta, StoryObj } from '@storybook/react'
import { PrivacyPolicy } from './PrivacyPolicy'

const meta: Meta<typeof PrivacyPolicy> = { component: PrivacyPolicy }
export default meta
type Story = StoryObj<typeof PrivacyPolicy>

export const Ja: Story = { parameters: { locale: 'ja' } }
export const En: Story = { parameters: { locale: 'en' } }
