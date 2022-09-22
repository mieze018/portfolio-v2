import { useTranslation } from 'next-i18next'

import type { LocalApi } from 'libs/@type/api/local'

import { Separator } from 'components/Atoms/Separator'
import { SectionWrapper, P } from 'components/Molecules/About/Atoms'

export const EventHistory = ({ events }: { events: LocalApi.Event[] }) => {
  const { t } = useTranslation('common')
  //日にちが今日以前のものだけを抽出
  const pastEvents = events.filter((event) => {
    const today = new Date()
    const eventDate = new Date(event.date)
    return eventDate < today
  })
  return (
    <SectionWrapper>
      <P>{t('eventHistory')}</P>

      <Separator />
      <ul>
        {pastEvents.map((event, eventK) => (
          <li key={eventK}>
            <p>{event.date}</p>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.place}</p>
            <p>{event.url}</p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
