'use client'

// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import { useForm, ValidationError } from '@formspree/react'
import { useTranslation } from 'libs/useTranslation'
import React from 'react'
import { tw, cva } from 'libs/component-factory'

import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { PrimaryButton } from 'components/Atoms/PrimaryButton'
import { Textarea } from 'components/Atoms/Textarea'

const Form = tw('form', cva('grid gap-4 w-full md:w-g-61vw m-auto max-w-screen-sm'))
const RequiredMarkSpan = tw('span', cva('text-main px-1'))
const Label = tw('label', cva('flex items-center gap-2 py-1'))

export const ContactForm = ({ formId }: { formId: string }) => {
  const [state, handleSubmit] = useForm(formId)
  const { tb } = useTranslation('common')
  // const [replyAllowed, setReplyAllowed] = useState(false)

  const RequiredMark = () => <RequiredMarkSpan>*</RequiredMarkSpan>
  type formType = {
    label: string
    type: string
    name: string
    placeholder?: string
    required: boolean
    checked?: boolean
    onChange?: () => void
  }
  const formsAttrs: formType[] = [
    {
      label: tb('messageLabel').en,
      type: 'textarea',
      name: 'message',
      required: true,
    },
    // {
    //   label: '返信可能',
    //   type: 'checkbox',
    //   name: 'replyAllowed',
    //   required: false,
    //   checked: replyAllowed,
    //   onChange: () => setReplyAllowed(!replyAllowed),
    // },
    // {
    //   label: 'お名前',
    //   type: 'text',
    //   name: 'name',
    //   required: replyAllowed ? true : false,
    // },
    // {
    //   label: 'メールアドレス',
    //   type: 'email',
    //   name: 'email',
    //   required: replyAllowed ? true : false,
    // },
  ]
  if (state.succeeded)
    return (
      <Center className="flex-wrap">
        <div>{tb('messageSendThankYou').ja}</div>
        <div>{tb('messageSendThankYou').en}</div>
      </Center>
    )
  return (
    <Form onSubmit={handleSubmit}>
      {formsAttrs.map(({ label, type, name, placeholder, required, checked, onChange }) => {
        if (type === 'textarea')
          return (
            <div key={name}>
              <Label htmlFor={name}>
                <LabelText>{label}</LabelText>
                {required && <RequiredMark />}
              </Label>
              <Textarea
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
              />
              <ValidationError prefix={label} field={name} errors={state.errors} />
            </div>
          )
        if (type === 'checkbox')
          return (
            <div key={name}>
              <Label htmlFor={name}>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                  className="w-4 h-4 p-2 border rounded-md border-Azure"
                  onChange={onChange}
                  checked={checked}
                />
                <LabelText>{label}</LabelText>
                {required && <RequiredMark />}
              </Label>
              <ValidationError prefix={label} field={name} errors={state.errors} />
            </div>
          )
        return (
          <div key={name}>
            <Label htmlFor={name}>
              {label}
              {required && <RequiredMark />}
            </Label>
            <input
              id={name}
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
              className="w-full p-2 border rounded-md border-Azure"
              onChange={onChange}
            />
            <ValidationError prefix={label} field={name} errors={state.errors} />
          </div>
        )
      })}
      <PrimaryButton type="submit" disabled={state.submitting}>
        {tb('messageSend').en}
      </PrimaryButton>
    </Form>
  )
}
