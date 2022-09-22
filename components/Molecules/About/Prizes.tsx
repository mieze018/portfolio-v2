import { useTranslation } from 'next-i18next'

import { Separator } from 'components/Atoms/Separator'
import { SectionWrapper, H2 } from 'components/Molecules/About/Atoms'

export const Prizes = () => {
  const { t } = useTranslation('common')
  return (
    <SectionWrapper>
      {t('awards')}

      <Separator />
      <ul>
        <li>
          <H2> </H2>
          <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
          「山口はるみ賞」及び「鈴木成一賞次点」
        </li>
      </ul>
    </SectionWrapper>
  )
}
