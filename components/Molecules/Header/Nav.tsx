import { cva } from 'class-variance-authority'
import { cn } from 'libs/tw-clsx-util'

import type { scrollStatesType } from 'libs/useScrollState'

import { useScrollState } from 'libs/useScrollState'

const navVariants = cva(
  'sticky top-0 z-10 m-auto mt-6 md:mt-2 text-center hover:blur-0 grid grid-flow-col justify-center gap-x-4',
  {
    variants: {
      footer: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      footer: false,
    },
  }
)

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init) {
    return 'brightness-100 blur-0'
  }
  if (scrollStates.sinking || scrollStates.sunk) {
    return 'brightness-125 blur-0 md:blur-[1px]'
  }
  return ''
}

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  $footer?: boolean
}

export const Nav = ({ children, $footer = false, className, ...props }: NavProps) => {
  const scrollStates = useScrollState()

  return (
    <nav
      className={cn(navVariants({ footer: $footer }), scrollAnimation(scrollStates), className)}
      style={{
        transitionProperty: 'opacity, filter, top',
        transitionDuration: '1s, 1s, 0.2s',
      }}
      {...props}
    >
      {children}
    </nav>
  )
}
