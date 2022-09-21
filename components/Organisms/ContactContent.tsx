import { useTranslation } from 'react-i18next'
import tw from 'twin.macro'

import type { aboutData } from 'pages/api/about'

import { P } from 'components/Molecules/About/Atoms'
import { ContactForm } from 'components/Molecules/ContactForm'
import { mail } from 'pages/api/basics'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mt-12 mx-auto gap-y-16`

export const ContactContent = ({ data }: { data: typeof aboutData }) => {
  const { links, events, workExperience, genres } = data

  const { t } = useTranslation()
  return (
    <Wrapper>
      <P>{t('toMail')}</P>
      <P css={tw`text-lg`}>
        <a href={`mailto:${mail}`}>{mail}</a>
      </P>
      <ContactForm />
    </Wrapper>
  )
}
