import type { LocalApi } from 'libs/@type/api/local'

import { SectionWrapper } from 'components/Atoms/About/Atoms'

export const Linktree = ({ links }: { links: LocalApi.SnsLink[] }) => (
  <SectionWrapper>
    {/* <h1>
      <a href={linktree.url}>{linktree.text}</a>
    </h1>
    <Separator />
    {links.map((link, linkK) => (
      <P key={linkK}>
        <SnsLink href={link.url}>{link.text}</SnsLink>
      </P>
    ))} */}
  </SectionWrapper>
)
