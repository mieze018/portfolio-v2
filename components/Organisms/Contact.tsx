import tw from 'twin.macro'

import type { aboutData } from 'pages/api/about'

const Wrapper = tw.div`px-5 text-xs leading-7 md:text-sm mb-20 grid gap-12 text-left w-fit mt-12 mx-auto gap-y-16`

export const ContactContent = ({ data }: { data: typeof aboutData }) => {
  const { links, events, workExperience, genres } = data

  return (
    <Wrapper>
      <form action="/send-data-here" method="post">
        <label htmlFor="roll">Roll Number</label>
        <input type="text" id="roll" name="roll" required minLength="10" maxLength="20" />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <button type="submit">Submit</button>
      </form>
    </Wrapper>
  )
}
