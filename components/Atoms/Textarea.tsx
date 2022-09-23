import TextareaAutosize from 'react-textarea-autosize'
import tw, { styled } from 'twin.macro'

export const Textarea = styled(TextareaAutosize).attrs({
  minRows: 5,
})`
  ${tw`w-full h-32 p-2 border rounded resize-none border-Azure outline-AliceBlue bg-white/80`}
`
