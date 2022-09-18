import tw, { css, styled } from 'twin.macro'

import type { scrollStatesType } from 'libs/useScrollState'

import { useScrollState } from 'libs/useScrollState'

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init)
    return css`
      ${tw`
      brightness-100
      blur-0
      `}
    `
  if (scrollStates.sinking || scrollStates.sunk)
    return css`
      ${tw`
      brightness-110 
      blur-[3px]
      `}
    `
  return tw``
}
export const Nav = styled.nav`
  ${tw`sticky top-0 z-10 m-auto text-center hover:blur-0`}

  transition-property: opacity, filter, top;
  transition-duration: 1s, 1s, 0.2s;
  ${() => scrollAnimation(useScrollState())}
`
