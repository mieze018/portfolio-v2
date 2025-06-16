import { GoMail } from 'react-icons/go'
import { IoMdPaperPlane } from 'react-icons/io'
import { tw, cva } from 'libs/component-factory'

import type { contactDataType } from 'pages/contact'

import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { Separator } from 'components/Atoms/Separator'
import { ContactForm } from 'components/Molecules/ContactForm'
import { getProperties } from 'libs/notion'
import { mail } from 'pages/api/basics'

const Wrapper = tw(
  'div',
  cva(
    'px-5 text-xs leading-7 md:text-sm max-w-(--breakpoint-sm) mb-24 grid gap-12 text-left mx-auto gap-y-16'
  )
)
const MailWrapper = tw(
  'div',
  cva('text-lg select-all mb-4 m-auto flex items-center justify-center')
)
const IconWrapper = tw('div', cva('py-4 text-xl m-auto flex items-center justify-center'))

export const ContactContent = ({ fallbackData, formId }: contactDataType & { formId: string }) => {
  const { workAcceptanceStatus } = fallbackData

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
        <ContactForm formId={formId} />
      </div>
    </Wrapper>
  )
}
