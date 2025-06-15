import { cva } from 'class-variance-authority'
import { cn } from 'libs/tw-clsx-util'

import type { scrollStatesType } from 'libs/useScrollState'

import { useScrollState } from 'libs/useScrollState'

const fadeOuterVariants = cva('opacity-100 duration-[0.5s]')

const scrollAnimation = (scrollStates: scrollStatesType) => {
  if (scrollStates.init) return 'opacity-100'
  return 'mb-[-4em] opacity-0'
}

interface FadeOuterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const FadeOuter = ({ children, className, ...props }: FadeOuterProps) => {
  const scrollStates = useScrollState()

  return (
    <div className={cn(fadeOuterVariants(), scrollAnimation(scrollStates), className)} {...props}>
      {children}
    </div>
  )
}
