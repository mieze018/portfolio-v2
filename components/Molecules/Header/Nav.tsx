import tw, { styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.sunk) return tw`opacity-100`
  if (scrollStates.sinking) return tw`opacity-0`
  return tw`opacity-100`
}
export const Nav = styled.nav<{ scrollStates: scrollStatesType }>`
  ${tw`z-10 text-center m-auto opacity-100 duration-[1200ms] hover:blur-none`}

  ${({ scrollStates }) => scrollAnimation(scrollStates)}
`
