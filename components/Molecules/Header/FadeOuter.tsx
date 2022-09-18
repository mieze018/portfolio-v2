import tw, { styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

import { useScrollState } from 'libs/useScrollState'

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init) return tw`opacity-100`
  return tw`mb-[-4em] opacity-0`
}

export const FadeOuter = styled.div`
  ${tw`opacity-100 duration-[0.5s]`}
  ${() => scrollAnimation(useScrollState())}
`
