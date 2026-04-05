import { cva } from 'class-variance-authority'
import { cn } from 'libs/tw-clsx-util'

const fadeOuterVariants = cva('')

interface FadeOuterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const FadeOuter = ({ children, className, ...props }: FadeOuterProps) => {
  return (
    <div className={cn(fadeOuterVariants(), 'fade-outer-anim', className)} {...props}>
      {children}
    </div>
  )
}
