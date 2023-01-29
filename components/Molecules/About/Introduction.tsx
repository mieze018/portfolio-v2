import { useTranslation } from 'next-i18next'

import { SectionWrapper, P } from 'components/Atoms/About/Atoms'

export const Introduction = () => {
  const { t } = useTranslation('common')
  return (
    <SectionWrapper>
      <P>
        {t('author')}
        <small className="mr-2">{t('author_pronunciation')}</small>
        {t('description')}
      </P>
    </SectionWrapper>
  )
}
