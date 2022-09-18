import tw, { styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

export const Nav = styled.nav<{ scrollStates: scrollStatesType }>`
  ${tw`sticky z-10 m-auto text-center`}
`
