import { useRouter } from 'next/router'
import { GoMail } from 'react-icons/go'
import { IoMdPaperPlane } from 'react-icons/io'
import { cva } from 'class-variance-authority'

import type { contactDataType } from 'pages/contact'

import { Center } from 'components/Atoms/Center'
import { LabelText } from 'components/Atoms/LabelText'
import { Separator } from 'components/Atoms/Separator'
import { ContactForm } from 'components/Molecules/ContactForm'
import { getProperties } from 'libs/notion'
import { mail } from 'pages/api/basics'

const wrapperVariants = cva(
  'px-5 text-xs leading-7 md:text-sm max-w-screen-sm mb-24 grid gap-12 text-left mx-auto gap-y-16'
)
const mailWrapperVariants = cva('text-lg select-all mb-4 m-auto flex items-center justify-center')
const iconWrapperVariants = cva('py-4 text-xl m-auto flex items-center justify-center')

export const ContactContent = ({ fallbackData }: contactDataType) => {
  const { workAcceptanceStatus } = fallbackData
  const router = useRouter()
  if (!router.locale) return <></>
  const statusTranslation = getProperties(workAcceptanceStatus, {
    name: router.locale.includes('ja') ? 'ja' : 'en',
    type: 'rich_text',
  })

  return (
    <div className={wrapperVariants()}>
      <Center>{statusTranslation}</Center>
      <Separator />
      <div>
        <div className={iconWrapperVariants()}>
          <LabelText aria-label="Email">
            <GoMail />
          </LabelText>
        </div>
        <div className={mailWrapperVariants()}>{mail}</div>
      </div>
      <Separator />
      <div>
        <div className={iconWrapperVariants()}>
          <LabelText aria-label="mail form">
            <IoMdPaperPlane />
          </LabelText>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
