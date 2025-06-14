import { useRouter } from 'next/router'
import { GoMail } from 'react-icons/go'
import { IoMdPaperPlane } from 'react-icons/io'
import tw from 'twin.macro'

import type { contactDataType } from 'pages/contact'

import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { Separator } from 'components/Atoms/Separator'
import { ContactForm } from 'components/Molecules/ContactForm'
import { getProperties } from 'libs/notion'
import { mail } from 'pages/api/basics'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm max-w-screen-sm mb-24 grid gap-12 text-left 
mx-auto gap-y-16`
const MailWrapper = tw(Center)`text-lg select-all mb-4`
const IconWrapper = tw(Center)`py-4 text-xl`

export const ContactContent = ({ fallbackData, formId }: contactDataType & { formId: string }) => {
  const { workAcceptanceStatus } = fallbackData
  const router = useRouter()
  if (!router.locale) return <></>
  const statusTranslation = getProperties(workAcceptanceStatus, {
    name: router.locale.includes('ja') ? 'ja' : 'en',
    type: 'rich_text',
  })

  return (
    <Wrapper>
      <Center>{statusTranslation}</Center>
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
