import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

const classes = cva('shadow-sm bg-black/10 shadow-main/10', {
  variants: {
    orientation: {
      horizontal: 'w-full h-px mx-auto',
      vertical: 'w-px h-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  className?: string
}

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = 'horizontal', ...props }, ref) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={classes({ orientation, className })}
      {...props}
    />
  )
})

Separator.displayName = 'Separator'
