import tw, { styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

const scrollAnimation = (scrollStates: scrollStatesType) =>
  scrollStates.sunk || scrollStates.sinking ? tw`opacity-0` : ''

export const FadeOuter = styled.div<{ scrollStates: scrollStatesType }>`
  ${tw`opacity-100 duration-[0.5s]`}
  ${({ scrollStates }) => scrollAnimation(scrollStates)}
`
