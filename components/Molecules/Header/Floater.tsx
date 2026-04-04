import { cva } from 'class-variance-authority'
import { cn } from 'libs/tw-clsx-util'

const floaterVariants = cva(
  'text-sm text-center w-full m-auto z-10 mb-0 min-h-[2em] sticky mt-g-23vh top-0 opacity-0'
)

interface FloaterProps {
  children: React.ReactNode
  className?: string
}

export const Floater = ({ children, className }: FloaterProps) => {
  return <header className={cn(floaterVariants(), 'floater-anim', className)}>{children}</header>
}
