import React from 'react'

import type { work } from 'libs/@type/work'

export const Work = ({ work }: { work: work }) => {
  return (
    <li>
      {work.author && <i className="ml-3">{work.author}</i>}
      <span className="ml-3">『{work.title}』</span>
      {work.publisher && <span className="ml-3">({work.publisher})</span>}
      {work.format && <small className="ml-3">{work.format}</small>}
      {work.designer && <small className="ml-3">{work.designer}</small>}
      {work.releaseMonth && <small className="ml-3">- {work.releaseMonth?.split('-', 1)}</small>}
    </li>
  )
}
