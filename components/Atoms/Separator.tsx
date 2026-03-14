import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cva } from 'class-variance-authority'

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

type RefLike<T> = ((instance: T | null) => void) | { current: T | null } | null

interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {
  className?: string
  ref?: RefLike<HTMLDivElement>
}

export const Separator = ({
  className,
  orientation = 'horizontal',
  ref,
  ...props
}: SeparatorProps) => {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={classes({ orientation, className })}
      {...props}
    />
  )
}

Separator.displayName = 'Separator'
