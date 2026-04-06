import { SectionWrapper } from 'components/Atoms/About/Atoms'
import { Separator } from 'components/Atoms/Separator'
import type { PageObject } from 'libs/@type/api/notion'
import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'
import { useTranslation } from 'libs/useTranslation'

export const Prizes = ({ prizes }: { prizes: PageObject[] }) => {
  const { tb } = useTranslation('common')
  const awards = tb('awards')

  return (
    <SectionWrapper>
      <h1>
        <p>{awards.ja}</p>
        <p>{awards.en}</p>
      </h1>

      <Separator className="mb-4" />
      {prizes.map((prize) => {
        const title = getProperties(prize, { name: 'title', type: 'title' })
        const prizeName = getProperties(prize, { name: 'prizeName', type: 'rich_text' })
        const date = getProperties(prize, { name: 'date', type: 'date' }).start
        return (
          <ul key={prize.id}>
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
