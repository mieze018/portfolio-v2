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
      grid-flow-col
      brightness-125 
      blur-[0px]
      md:blur-[1px]
      `}
    `
  return tw``
}
export const Nav = styled.nav<{ footer?: boolean }>`
  ${tw`sticky top-0 z-10 m-auto mt-12 md:mt-2 text-center hover:blur-0 grid md:grid-flow-col justify-center gap-y-12 gap-x-4`}

  transition-property: opacity, filter, top;
  transition-duration: 1s, 1s, 0.2s;
  ${({ footer }) => !footer && scrollAnimation(useScrollState())}
`
