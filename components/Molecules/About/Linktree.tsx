import { Separator } from '@radix-ui/react-separator'

import { P, SectionWrapper } from 'components/Atoms/About/Atoms'
import type { LocalApi } from 'libs/@type/api/local'

export const Linktree = ({ links }: { links: LocalApi.SnsLink[] }) => (
  <SectionWrapper>
    <Separator />
    {links.map((link) => (
      <P key={link.url}>
        <a href={link.url}>{link.text}</a>
      </P>
    ))}
  </SectionWrapper>
)
