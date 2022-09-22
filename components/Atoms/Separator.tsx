import * as SeparatorPrimitive from '@radix-ui/react-separator'
import tw, { styled } from 'twin.macro'

export const Separator = styled(SeparatorPrimitive.Root)`
  ${tw`shadow-sm bg-black/10 shadow-main/10`}

  &[data-orientation="horizontal"] {
    ${tw`w-full h-px`}
  }

  &[data-orientation='vertical'] {
    ${tw`w-px h-full`}
  }
`
