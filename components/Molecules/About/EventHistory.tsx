import { useTranslation } from 'next-i18next'

import type { PageObject } from 'libs/@type/api/notion'

import { Separator } from 'components/Atoms/Separator'
import { SectionWrapper, P } from 'components/Molecules/About/Atoms'
import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'

export const EventHistory = ({ events }: { events: PageObject[] }) => {
  const { t } = useTranslation('common')
  //日にちが今日以前のものだけを抽出
  const pastEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.properties.date.date.start)
    return eventDate < today
  })
  return (
    <SectionWrapper>
      <P>{t('eventHistory')}</P>

      <Separator />
      <ul className="mt-2">
        {pastEvents.map((event) => {
          const properties = event.properties
          console.log(properties)
          const title = getProperties({ object: event, name: 'title', type: 'title' })
          const place = getProperties({ object: event, name: 'place', type: 'select' })
          const date = getProperties({ object: event, name: 'date', type: 'date' }).start
          const url = getProperties({ object: event, name: 'url', type: 'url' })
          const description = getProperties({
            object: event,
            name: 'description',
            type: 'rich_text',
          })
          return (
            <li key={event.id}>
              <p>{dateToYear(date)}</p>
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{place}</p>
              <p>{url}</p>
            </li>
          )
        })}
      </ul>
    </SectionWrapper>
  )
}
