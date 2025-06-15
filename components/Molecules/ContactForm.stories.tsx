import type { Meta, StoryObj } from '@storybook/nextjs'
import { ContactForm } from './ContactForm'

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof ContactForm>

export const Default: Story = {
  args: {
    formId: 'dummy-form-id',
  },
}
