import { useTranslation } from 'react-i18next'

import { SectionWrapper, Hr, H2 } from 'components/Molecules/Info/Atoms'

export const Prizes = () => {
  const { t } = useTranslation()
  return (
    <SectionWrapper>
      {t('awards')}
      <Hr />
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
