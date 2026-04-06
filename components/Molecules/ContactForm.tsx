import { type useForm, ValidationError } from '@formspree/react'
import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { PrimaryButton } from 'components/Atoms/PrimaryButton'
import { Textarea } from 'components/Atoms/Textarea'
import { cva, tw } from 'libs/component-factory'
import { useTranslation } from 'libs/useTranslation'
import type { FormEvent } from 'react'

const Form = tw('form', cva('grid gap-4 w-full md:w-g-61vw m-auto max-w-(--breakpoint-sm)'))
const RequiredMarkSpan = tw('span', cva('text-main px-1'))
const Label = tw('label', cva('flex items-center gap-2 py-1'))

export type formFieldType = {
  label: string
  type: string
  name: string
  placeholder?: string
  required: boolean
  checked?: boolean
  onChange?: () => void
}

// Why: @formspree/react が FormState 型を export しないため、useForm の戻り値から抽出する
export type formStateType = ReturnType<typeof useForm>[0]

export type contactFormType = {
  state: formStateType
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  formFields: formFieldType[]
}

/**
 * フォーム表示のプレゼンテーショナルコンポーネント
 *
 * Why: useForm（データ取得/状態管理）は呼び出し元（ContactContent）が担い、
 * このコンポーネントは受け取った state を表示するだけに専念する。
 * これにより Storybook から state.succeeded 等の分岐を自由にテストできる。
 */
export const ContactForm = ({ state, handleSubmit, formFields }: contactFormType) => {
  const { tb } = useTranslation('common')
  const RequiredMark = () => <RequiredMarkSpan>*</RequiredMarkSpan>

  if (state.succeeded)
    return (
      <Center className="flex-wrap">
        <div>{tb('messageSendThankYou').ja}</div>
        <div>{tb('messageSendThankYou').en}</div>
      </Center>
    )
  return (
    <Form onSubmit={handleSubmit}>
      {formFields.map(({ label, type, name, placeholder, required, checked, onChange }) => {
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
