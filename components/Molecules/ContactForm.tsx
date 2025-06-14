// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import { useForm, ValidationError } from '@formspree/react'
import { useTranslation } from 'next-i18next'
import React from 'react'
import tw from 'twin.macro'

import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { PrimaryButton } from 'components/Atoms/PrimaryButton'
import { Textarea } from 'components/Atoms/Textarea'

export const ContactForm = ({ formId }: { formId: string }) => {
  const [state, handleSubmit] = useForm(formId)
  const { t } = useTranslation('common')
  // const [replyAllowed, setReplyAllowed] = useState(false)

  const Form = tw.form`grid gap-4 w-full md:w-g-61vw m-auto max-w-screen-sm`
  const RequiredMarkSpan = tw.span`text-main px-1`
  const RequiredMark = () => <RequiredMarkSpan>*</RequiredMarkSpan>
  const SubmitButton = tw(PrimaryButton)``
  const Label = tw.label`flex items-center gap-2 py-1`
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
      label: t('messageLabel'),
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
  if (state.succeeded) return <Center>{t('messageSendThankYou')}</Center>
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
                  css={tw`w-4 h-4 p-2 border rounded-md border-Azure`}
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
              css={tw`w-full p-2 border rounded-md border-Azure`}
              onChange={onChange}
            />
            <ValidationError prefix={label} field={name} errors={state.errors} />
          </div>
        )
      })}
      <SubmitButton type="submit" disabled={state.submitting}>
        {t('messageSend')}
      </SubmitButton>
    </Form>
  )
}
