import { tw, cva } from 'libs/component-factory'

import type { aboutDataType } from 'pages/about'

// import { EventHistory } from 'components/Molecules/About/EventHistory'
import { Events } from 'components/Molecules/About/Events'
import { Introduction } from 'components/Molecules/About/Introduction'
import { Linktree } from 'components/Molecules/About/Linktree'
import { Participant } from 'components/Molecules/About/Participant'
import { Prizes } from 'components/Molecules/About/Prizes'
import { WorkExperience } from 'components/Molecules/About/WorkExperience'
import { links } from 'pages/api/about/links'

const Wrapper = tw(
  'div',
  // Why: v4 では leading-7 が --tw-leading CSS変数として全子孫にカスケードするため、
  //      md:text-sm が v3 の様に line-height: 1.25rem を上書きしない。
  //      md:leading-5 を明示して v3 の挙動 (text-sm の既定行高 1.25rem) を復元する。
  cva(
    'px-5 text-xs leading-7 md:text-sm md:leading-5 mb-20 grid gap-12 text-left w-fit mt-14 mx-auto gap-y-16'
  )
)

export const AboutContent = ({ fallbackData }: aboutDataType) => {
  const { prizes, workExperience, workExperienceGenre, events } = fallbackData
  if (!fallbackData) return <div>Loading...</div>
  return (
    <Wrapper>
      <Introduction />
      {!!events?.length && <Events events={events} />}
      {!!workExperienceGenre?.length && (
        <WorkExperience workExperience={workExperience} genres={workExperienceGenre} />
      )}
      {/* <EventHistory events={events} /> */}
      <Prizes prizes={prizes} />
      {!!links?.length && <Linktree links={links} />}
      <Participant />
    </Wrapper>
  )
}
