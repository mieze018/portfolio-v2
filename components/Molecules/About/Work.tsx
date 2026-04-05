import type { PageObject } from 'libs/@type/api/notion'
import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'

type workType = {
  work: PageObject
  genreName?: string | null
}

export const Work = ({ work, genreName }: workType) => {
  const title = getProperties(work, { name: 'title', type: 'title' })
  const author = getProperties(work, { name: 'author', type: 'select' })
  const format = getProperties(work, { name: 'format', type: 'select' })
  const date = getProperties(work, { name: 'date', type: 'date' })?.start
  const designer = getProperties(work, { name: 'designer', type: 'select' })
  const url = getProperties(work, { name: 'url', type: 'url' })
  const publisher = getProperties(work, { name: 'publisher', type: 'select' })
  return (
    <li>
      {genreName && <span>{genreName}</span>}
      <li className="flex flex-wrap items-end gap-x-3">
        {title && <span>『{title}』</span>}
        {author && <span>{author}</span>}
        {publisher && <span>{publisher}</span>}
        {format && <small>{format}</small>}
        {designer && <small>{designer}</small>}
        {date && <small> - {dateToYear(date)}</small>}
        {url && (
          <small>
            <a href={url} target="_blank" rel="noopener noreferrer">
              [link]
            </a>
          </small>
        )}
      </li>
    </li>
  )
}
