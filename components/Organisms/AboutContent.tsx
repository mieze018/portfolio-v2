import tw from 'twin.macro'

import type { aboutData } from 'pages/api/about'

import { EventHistory } from 'components/Molecules/About/EventHistory'
import { Events } from 'components/Molecules/About/Events'
import { Introduction } from 'components/Molecules/About/Introduction'
import { Linktree } from 'components/Molecules/About/Linktree'
import { Participant } from 'components/Molecules/About/Participant'
import { Prizes } from 'components/Molecules/About/Prizes'
import { WorkExperience } from 'components/Molecules/About/WorkExperience'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mt-12 mx-auto gap-y-16`

export const AboutContent = ({ data }: { data: typeof aboutData }) => {
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
