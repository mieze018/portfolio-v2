import type { LocalApi } from 'libs/@type/api/local'

import { SectionWrapper, Hr, P, SnsLink } from 'components/Molecules/About/Atoms'
import { linktree } from 'pages/api/about/links'

export const Linktree = ({ links }: { links: LocalApi.SnsLink[] }) => (
  <SectionWrapper>
    <h1>
      <a href={linktree.url}>{linktree.text}</a>
    </h1>
    <Hr />
    {links.map((link, linkK) => (
      <P key={linkK}>
        <SnsLink href={link.url}>{link.text}</SnsLink>
      </P>
    ))}
  </SectionWrapper>
)
