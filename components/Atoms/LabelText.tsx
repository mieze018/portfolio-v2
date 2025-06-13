import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'

interface LabelTextProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Label> {
  className?: string
}

export const LabelText = forwardRef<React.ElementRef<typeof LabelPrimitive.Label>, LabelTextProps>(
  ({ className, ...props }, ref) => {
    return <LabelPrimitive.Label ref={ref} className={className} {...props} />
  }
)

LabelText.displayName = 'LabelText'
