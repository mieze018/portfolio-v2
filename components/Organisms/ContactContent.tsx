import { useForm } from '@formspree/react'
import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { Separator } from 'components/Atoms/Separator'
import type { formFieldType } from 'components/Molecules/ContactForm'
import { ContactForm } from 'components/Molecules/ContactForm'
import { cva, tw } from 'libs/component-factory'
import { getProperties } from 'libs/notion'
import { useTranslation } from 'libs/useTranslation'
import { mail } from 'pages/api/basics'
import type { contactDataType } from 'pages/contact'
import { GoMail } from 'react-icons/go'
import { IoMdPaperPlane } from 'react-icons/io'

const Wrapper = tw(
  'div',
  cva(
    // Why: v4 では leading-7 が --tw-leading CSS変数として全子孫にカスケードするため、
    //      md:text-sm が v3 の様に line-height: 1.25rem を上書きしない。
    //      md:leading-5 を明示して v3 の挙動 (text-sm の既定行高 1.25rem) を復元する。
    'px-5 text-xs leading-7 md:text-sm md:leading-5 max-w-(--breakpoint-sm) mb-24 grid gap-12 text-left mx-auto gap-y-16'
  )
)
const MailWrapper = tw(
  'div',
  // Why: 親の md:leading-5 が --tw-leading=1.25rem にカスケードするが、
  //      text-lg の v3 既定行高は 1.75rem だったので md:leading-7 で明示的に復元する。
  cva('text-lg md:leading-7 select-all mb-4 m-auto flex items-center justify-center')
)
const IconWrapper = tw(
  'div',
  // Why: text-xl の v3 既定行高 1.75rem を md: で明示的に保持する (MailWrapper と同様の理由)。
  cva('py-4 text-xl md:leading-7 m-auto flex items-center justify-center')
)

export const ContactContent = ({ fallbackData, formId }: contactDataType & { formId: string }) => {
  const { workAcceptanceStatus } = fallbackData
  const [state, handleSubmit] = useForm(formId)
  const { tb } = useTranslation('common')

  const formFields: formFieldType[] = [
    {
      label: tb('messageLabel').en,
      type: 'textarea',
      name: 'message',
      required: true,
    },
  ]

  return (
    <Wrapper>
      <Center className="flex flex-col items-center justify-center">
        <div>
          {getProperties(workAcceptanceStatus, {
            name: 'ja',
            type: 'rich_text',
          })}
        </div>

        <div>
          {getProperties(workAcceptanceStatus, {
            name: 'en',
            type: 'rich_text',
          })}
        </div>
      </Center>
      <Separator />
      <div>
        <IconWrapper>
          <LabelText aria-label="Email">
            <GoMail />
          </LabelText>
        </IconWrapper>
        <MailWrapper>{mail}</MailWrapper>
      </div>
      <Separator />
      <div>
        <IconWrapper>
          <LabelText aria-label="mail form">
            <IoMdPaperPlane />
          </LabelText>
        </IconWrapper>
        <ContactForm state={state} handleSubmit={handleSubmit} formFields={formFields} />
      </div>
    </Wrapper>
  )
}
