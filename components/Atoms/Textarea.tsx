import { cva } from 'class-variance-authority'
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize'

const textareaVariants = cva(
  'w-full h-32 p-2 border rounded resize-none border-Azure outline-AliceBlue bg-white/80'
)

type RefLike<T> = ((instance: T | null) => void) | { current: T | null } | null

interface TextareaProps extends TextareaAutosizeProps {
  className?: string
  ref?: RefLike<HTMLTextAreaElement>
}

export const Textarea = ({ className, ref, ...props }: TextareaProps) => {
  return (
    <TextareaAutosize
      ref={ref}
      minRows={5}
      className={textareaVariants({ className })}
      {...props}
    />
  )
}

Textarea.displayName = 'Textarea'
