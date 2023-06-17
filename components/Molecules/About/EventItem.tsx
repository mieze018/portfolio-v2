type eventItemType = {
  key: unknown
  title: string
  date: string | number
  place: string
  url: string
  description: string
}
export const EventItem = ({ title, description, place, date, url }: eventItemType) => {
  return (
    <li>
      <p>{date}</p>
      <h2>{title}</h2>
      <p>{place}</p>
      <p>
        <a href={url}>{url}</a>
      </p>
      <p>{description}</p>
    </li>
  )
}
