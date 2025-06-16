import { useTranslation } from 'libs/useTranslation'

import type { PageObject } from 'libs/@type/api/notion'

import { SectionWrapper } from 'components/Atoms/About/Atoms'
import { Separator } from 'components/Atoms/Separator'
import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'

export const Prizes = ({ prizes }: { prizes: PageObject[] }) => {
  const { tb } = useTranslation('common')
  const awards = tb('awards')

  return (
    <SectionWrapper>
      <div>
        <div>{awards.ja}</div>
        {awards.en && <div>{awards.en}</div>}
      </div>

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
