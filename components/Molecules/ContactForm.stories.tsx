import type { Meta, StoryObj } from '@storybook/react'
import { ContactForm } from './ContactForm'

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
  parameters: {
    // Formspreeのテストを避けるため、APIコールを無効化
    chromatic: { disableSnapshot: false },
  },
}
export default meta
type Story = StoryObj<typeof ContactForm>

export const Default: Story = {}
