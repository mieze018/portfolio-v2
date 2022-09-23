import { dateToYear } from 'libs/dataFormat'

type eventItemType = {
  title: string
  date: string
  place: string
  url: string
  description: string
}
export const EventItem = ({ title, description, place, date, url }: eventItemType) => {
  return (
    <li>
      <p>{dateToYear(date)}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{place}</p>
      <p>{url}</p>
    </li>
  )
}
