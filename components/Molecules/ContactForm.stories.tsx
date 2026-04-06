import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { FormEvent } from 'react'
import { ContactForm } from './ContactForm'

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
}
export default meta
type Story = StoryObj<typeof ContactForm>

const noop = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

const defaultFormFields = [{ label: 'Message', type: 'textarea', name: 'message', required: true }]

export const Default: Story = {
  args: {
    state: {
      succeeded: false,
      submitting: false,
      errors: null,
      result: null,
    },
    handleSubmit: noop,
    formFields: defaultFormFields,
  },
}

/** 送信成功後の表示（state.succeeded = true）をカバー */
export const Succeeded: Story = {
  args: {
    state: {
      succeeded: true,
      submitting: false,
      errors: null,
      result: null,
    },
    handleSubmit: noop,
    formFields: defaultFormFields,
  },
}

/** 送信中の状態（state.submitting = true）をカバー */
export const Submitting: Story = {
  args: {
    state: {
      succeeded: false,
      submitting: true,
      errors: null,
      result: null,
    },
    handleSubmit: noop,
    formFields: defaultFormFields,
  },
}

/** checkbox / text フィールドの分岐をカバー */
export const WithAllFieldTypes: Story = {
  args: {
    state: {
      succeeded: false,
      submitting: false,
      errors: null,
      result: null,
    },
    handleSubmit: noop,
    formFields: [
      { label: 'Message', type: 'textarea', name: 'message', required: true },
      {
        label: '返信可能',
        type: 'checkbox',
        name: 'replyAllowed',
        required: true,
        checked: false,
      },
      { label: 'お名前', type: 'text', name: 'name', required: true },
      { label: 'メールアドレス', type: 'email', name: 'email', required: true },
    ],
  },
}
