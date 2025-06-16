import { useTranslation } from 'libs/useTranslation'

import type { PageObject } from 'libs/@type/api/notion'

import { SectionWrapper } from 'components/Atoms/About/Atoms'
import { Separator } from 'components/Atoms/Separator'
import { EventItem } from 'components/Molecules/About/EventItem'
import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'

export const EventHistory = ({ events }: { events: PageObject[] }) => {
  const { tb } = useTranslation('common')
  const eventHistory = tb('eventHistory')

  //日にちが今日以前のものだけを抽出
  const pastEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(getProperties(event, { name: 'date', type: 'date' }).start)
    return eventDate < today
  })
  return (
    <SectionWrapper>
      <div className="space-y-1">
        <div>{eventHistory.ja}</div>
        {eventHistory.en && <div>{eventHistory.en}</div>}
      </div>

      <Separator />
      <ul className="mt-2">
        {pastEvents.map((event) => {
          const title = getProperties(event, { name: 'title', type: 'title' })
          const place = getProperties(event, { name: 'place', type: 'select' })
          const date = getProperties(event, { name: 'date', type: 'date' }).start
          const url = getProperties(event, { name: 'url', type: 'url' })
          const description = getProperties(event, { name: 'description', type: 'rich_text' })
          return (
            <EventItem
              key={event.id}
              title={title}
              place={place}
              date={dateToYear(date)}
              url={url}
              description={description}
            />
          )
        })}
      </ul>
    </SectionWrapper>
  )
}
