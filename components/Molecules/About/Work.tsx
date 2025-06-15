import React from 'react'

import type { PageObject } from 'libs/@type/api/notion'

import { dateToYear } from 'libs/dataFormat'
import { getProperties } from 'libs/notion'

export const Work = ({ work }: { work: PageObject }) => {
  const title = getProperties(work, { name: 'title', type: 'title' })
  const author = getProperties(work, { name: 'author', type: 'select' })
  const format = getProperties(work, { name: 'format', type: 'select' })
  const date = getProperties(work, { name: 'date', type: 'date' })?.start
  const designer = getProperties(work, { name: 'designer', type: 'select' })
  const url = getProperties(work, { name: 'url', type: 'url' })
  const publisher = getProperties(work, { name: 'publisher', type: 'select' })
  return (
    <li className="flex flex-wrap items-end gap-x-3">
      {author && <i>{author}</i>}
      {title && <span>『{title}』</span>}
      {publisher && <span>({publisher})</span>}
      {format && <small>{format}</small>}
      {designer && <small>{designer}</small>}
      {date && <small> - {dateToYear(date)}</small>}
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          [link]
        </a>
      )}
    </li>
  )
}
