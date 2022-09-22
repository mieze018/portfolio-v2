import { useTranslation } from 'react-i18next'

import type { LocalApi } from 'libs/@type/api/local'

import { Separator } from 'components/Atoms/Separator'
import { P } from 'components/Molecules/About/Atoms'

export const Events = ({ events }: { events: LocalApi.Event[] }) => {
  const { t } = useTranslation()
  //日にちが今日以降のものだけを抽出
  const futureEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.date)
    return eventDate >= today
  })
  if (!futureEvents.length) return <></>
  return (
    <div className="mt-12">
      <P>{t('eventIncoming')}</P>

      <Separator />
      <ul>
        {futureEvents.map((event, eventK) => (
          <li key={eventK}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.place}</p>
            <p>{event.url}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
