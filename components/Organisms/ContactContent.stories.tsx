import type { Meta, StoryObj } from '@storybook/nextjs'
import { ContactContent } from './ContactContent'
import type { PageObject } from 'libs/@type/api/notion'

const meta: Meta<typeof ContactContent> = {
  component: ContactContent,
}
export default meta
type Story = StoryObj<typeof ContactContent>

const mockWorkAcceptanceStatus: PageObject = {
  id: 'status-1',
  properties: {
    ja: {
      type: 'rich_text',
      rich_text: [
        {
          plain_text: '現在、新規のお仕事のご依頼を受け付けております。',
        },
      ],
    },
    en: {
      type: 'rich_text',
      rich_text: [{ plain_text: 'Currently accepting new work inquiries. ' }],
    },
  },
} as PageObject

export const Default: Story = {
  args: {
    fallbackData: {
      workAcceptanceStatus: mockWorkAcceptanceStatus,
    },
    formId: 'dummy-form-id-for-storybook',
  },
}
