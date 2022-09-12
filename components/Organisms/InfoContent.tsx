import tw from 'twin.macro'

import type { infoData } from 'pages/api/info'

import { EventHistory } from 'components/Molecules/Info/EventHistory'
import { Events } from 'components/Molecules/Info/Events'
import { Introduction } from 'components/Molecules/Info/Introduction'
import { Linktree } from 'components/Molecules/Info/Linktree'
import { Participant } from 'components/Molecules/Info/Participant'
import { Prizes } from 'components/Molecules/Info/Prizes'
import { WorkExperience } from 'components/Molecules/Info/WorkExperience'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mx-auto gap-y-16`

export const InfoContent = ({ data }: { data: typeof infoData }) => {
  const { links, events, workExperience, genres } = data
  return (
    <Wrapper>
      <Introduction />
      {links?.length && <Linktree links={links} />}
      {events?.length && <Events events={events} />}
      {workExperience?.length && <WorkExperience workExperience={workExperience} genres={genres} />}
      <EventHistory events={events} />
      <Prizes />
      <Participant />
    </Wrapper>
  )
}
