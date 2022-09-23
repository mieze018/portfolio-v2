import { useTranslation } from 'next-i18next'

import type { PageObject } from 'libs/@type/api/notion'

import { Separator } from 'components/Atoms/Separator'
import { SectionWrapper } from 'components/Molecules/About/Atoms'
import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'

export const Prizes = ({ prizes }: { prizes: PageObject[] }) => {
  const { t } = useTranslation('common')
  return (
    <SectionWrapper>
      {t('awards')}

      <Separator />
      {prizes.map((prize) => {
        const title = getProperties(prize, { name: 'title', type: 'title' })
        const prizeName = getProperties(prize, { name: 'prizeName', type: 'rich_text' })
        const date = getProperties(prize, { name: 'date', type: 'date' }).start
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
