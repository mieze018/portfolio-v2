import tw, { styled } from 'twin.macro'

import type { scrollStatesType } from 'components/Molecules/Header/TopBar'

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.sunk || scrollStates.sinking) return tw`opacity-0 mt-[-2em]`
  return tw``
}
export const FadeOuter = styled.div<{ scrollStates: scrollStatesType }>`
  ${tw`opacity-100 duration-[5000ms]`} /* margin-top: calc(23vh);
opacity: 1;
transition-duration: 2000ms, 2000ms, 2000ms, 10000ms;
transition-property: opacity, translate, filter, margin-top; */
  ${({ scrollStates }) => scrollAnimation(scrollStates)}
`
