import { useTranslation } from 'next-i18next'
import { GoMail } from 'react-icons/go'
import { IoMdPaperPlane } from 'react-icons/io'
import tw from 'twin.macro'

import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { Separator } from 'components/Atoms/Separator'
import { P } from 'components/Molecules/About/Atoms'
import { ContactForm } from 'components/Molecules/ContactForm'
import { mail } from 'pages/api/basics'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mt-12 mx-auto gap-y-16`
const MailWrapper = tw(Center)`text-lg select-all`
const IconWrapper = tw(Center)`py-4`
export const ContactContent = () => {
  const { t } = useTranslation('common')
  return (
    <Wrapper>
      <P>{t('acceptingWork')}</P>
      <P>
        <IconWrapper>
          <LabelText aria-label="Email">
            <GoMail />
          </LabelText>
        </IconWrapper>
        <MailWrapper>{mail}</MailWrapper>
      </P>
      <Separator />
      <P>
        <IconWrapper>
          <LabelText aria-label="mail form">
            <IoMdPaperPlane />
          </LabelText>
        </IconWrapper>
        <ContactForm />
      </P>
    </Wrapper>
  )
}
