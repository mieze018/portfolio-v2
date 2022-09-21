// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import { useForm, ValidationError } from '@formspree/react'
import React from 'react'
import tw from 'twin.macro'

export const ContactForm = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM || '')

  const Form = tw.form`grid gap-4 w-full md:w-g-61vw m-auto md:max-w-screen-md`
  const RequiredMarkSpan = tw.span`text-main px-1`
  const RequiredMark = () => <RequiredMarkSpan>*</RequiredMarkSpan>
  const [replyRequested, setReplyRequested] = React.useState(false)
  type formType = {
    label: string
    type: string
    name: string
    placeholder: string
    required: boolean
    checked?: boolean
    onChange?: () => void
  }
  const forms: formType[] = [
    {
      label: 'メッセージ',
      type: 'textarea',
      name: 'message',
      placeholder: 'メッセージ',
      required: true,
    },
    {
      label: '返信を希望する',
      type: 'checkbox',
      name: 'replyRequested',
      placeholder: '返信を希望する',
      required: false,
      checked: replyRequested,
      onChange: () => setReplyRequested(!replyRequested),
    },
    {
      label: 'お名前',
      type: 'text',
      name: 'name',
      placeholder: 'お名前',
      required: replyRequested ? true : false,
    },
    {
      label: 'メールアドレス',
      type: 'email',
      name: 'email',
      placeholder: 'メールアドレス',
      required: replyRequested ? true : false,
    },
  ]

  return (
    <Form onSubmit={handleSubmit}>
      {forms.map(({ label, type, name, placeholder, required, checked, onChange }) => {
        if (type === 'textarea')
          return (
            <div key={name}>
              <label htmlFor={name}>
                {label}
                {required && <RequiredMark />}
              </label>
              <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                css={tw`w-full h-32 p-2 border rounded-md border-Azure`}
                onChange={onChange}
              />
              <ValidationError prefix={label} field={name} errors={state.errors} />
            </div>
          )
        if (type === 'checkbox')
          return (
            <div key={name}>
              <label htmlFor={name}>
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
                {label}
                {required && <RequiredMark />}
              </label>
              <ValidationError prefix={label} field={name} errors={state.errors} />
            </div>
          )
        return (
          <div key={name}>
            <label htmlFor={name}>
              {label}
              {required && <RequiredMark />}
            </label>
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
      {/* <label htmlFor="email">Name</label>
      <input id="name" type="name" name="name" disabled={state.succeeded} />
      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" name="email" disabled={state.succeeded} />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="email">Message</label>
      <textarea id="message" name="message" disabled={state.succeeded} />
      <ValidationError prefix="Message" field="message" errors={state.errors} /> */}
      <button type="submit" disabled={state.submitting}>
        Send
      </button>
      {state.succeeded && <p>送信が正常に完了しました。ありがとうございました。</p>}
    </Form>
  )
}
