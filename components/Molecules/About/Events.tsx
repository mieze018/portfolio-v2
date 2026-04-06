import { Separator } from 'components/Atoms/Separator'
import { EventItem } from 'components/Molecules/About/EventItem'
import type { PageObject } from 'libs/@type/api/notion'
import { getProperties } from 'libs/notion'
import { useTranslation } from 'libs/useTranslation'

export const Events = ({ events }: { events: PageObject[] }) => {
  const { tb } = useTranslation('common')
  const eventIncoming = tb('eventIncoming')

  //日にちが今日以降のものだけを抽出
  const futureEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(getProperties(event, { name: 'date', type: 'date' }).start)
    return eventDate >= today
  })
  if (!futureEvents.length) return null
  return (
    <div className="mt-12">
      <div className="space-y-1">
        <div>{eventIncoming.ja}</div>
        {eventIncoming.en && <div>{eventIncoming.en}</div>}
      </div>

      <Separator className="mb-4" />
      <ul>
        {futureEvents.map((event) => {
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
              date={date}
              url={url}
              description={description}
            />
          )
        })}
      </ul>
    </div>
  )
}
