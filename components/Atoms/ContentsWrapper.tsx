import { keyframes } from 'styled-components'
import tw, { styled } from 'twin.macro'

const sunkShort = keyframes`
  0% {
    transform: translate(0, -1em);
  }
  100% {
    transform: translate(0, 0);
  }
`

export const ContentsWrapper = styled.section`
  ${tw`px-0 py-6 mt-golden61vh`}
  transform: translate(0, -10em);
  animation: ${sunkShort} 3s 0s ease-out forwards;
`
