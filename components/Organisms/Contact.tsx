import tw from 'twin.macro'

import type { aboutData } from 'pages/api/about'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mt-12 mx-auto gap-y-16`

export const Contact = ({ data }: { data: typeof aboutData }) => {
  const { links, events, workExperience, genres } = data
  return <Wrapper>contact</Wrapper>
}
