import { useTranslation } from 'react-i18next'

import { SectionWrapper, P } from 'components/Molecules/Info/Atoms'
import { mail } from 'pages/api/basics'

export const Introduction = () => {
  const { t } = useTranslation()
  return (
    <SectionWrapper>
      <P>
        {t('author')}
        <small>{t('author_pronunciation')}</small>
        {t('description')}
      </P>
      <P>
        {t('toMail')}
        <br />
        <a href={`mailto:${mail}`}>{mail}</a>
      </P>
    </SectionWrapper>
  )
}
