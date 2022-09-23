import { useTranslation } from 'next-i18next'

import type { PageObject } from 'libs/@type/api/notion'

import { Separator } from 'components/Atoms/Separator'
import { SectionWrapper } from 'components/Molecules/About/Atoms'
import { dateToYear } from 'libs/dataFormat'

export const Prizes = ({ prizes }: { prizes: PageObject[] }) => {
  const { t } = useTranslation('common')
  return (
    <SectionWrapper>
      {t('awards')}

      <Separator />
      {prizes.map((prize) => {
        const properties = prize.properties
        const title = properties.title.title[0].plain_text
        const prizeName = properties.prize.rich_text[0].plain_text
        const date = properties.date.date.start
        return (
          <ul key={prize.id} className="mt-2">
            <li>
              <i className="ml-3">{title}</i>
              {prizeName}
              <i>{dateToYear(date)}</i>
            </li>
          </ul>
        )
      })}
    </SectionWrapper>
  )
}
