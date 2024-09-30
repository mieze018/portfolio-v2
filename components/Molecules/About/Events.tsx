import { useTranslation } from 'next-i18next'
import React from 'react'

import type { PageObject } from 'libs/@type/api/notion'

import { P } from 'components/Atoms/About/Atoms'
import { Separator } from 'components/Atoms/Separator'
import { EventItem } from 'components/Molecules/About/EventItem'
import { getProperties } from 'libs/notion'

export const Events = ({ events }: { events: PageObject[] }) => {
  const { t } = useTranslation('common')
  //日にちが今日以降のものだけを抽出
  const futureEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(getProperties(event, { name: 'date', type: 'date' }).start)
    return eventDate >= today
  })
  if (!futureEvents.length) return <></>
  return (
    <div className="mt-12">
      <P>{t('eventIncoming')}</P>

      <Separator />
      <ul className="mt-2">
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
