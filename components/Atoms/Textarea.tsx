import TextareaAutosize from 'react-textarea-autosize'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

const textareaVariants = cva(
  'w-full h-32 p-2 border rounded resize-none border-Azure outline-AliceBlue bg-white/80'
)

interface TextareaProps extends React.ComponentPropsWithoutRef<typeof TextareaAutosize> {
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref}
        minRows={5}
        className={textareaVariants({ className })}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
