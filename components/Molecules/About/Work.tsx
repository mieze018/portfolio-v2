import React from 'react'
import tw from 'twin.macro'

import type { LocalApi } from 'libs/@type/api/local'

export const Work = ({ work }: { work: LocalApi.WorkExperience.Work }) => {
  return (
    <li css={tw`flex gap-3`}>
      {work.author && <i>{work.author}</i>}
      <span>『{work.title}』</span>
      {work.publisher && <span>({work.publisher})</span>}
      {work.format && <small>{work.format}</small>}
      {work.designer && <small>{work.designer}</small>}
      {work.releaseMonth && <small>- {work.releaseMonth?.split('-', 1)}</small>}
    </li>
  )
}
