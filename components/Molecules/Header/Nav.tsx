import { cva } from 'class-variance-authority'
import { cn } from 'libs/tw-clsx-util'

const navVariants = cva(
  'sticky top-0 z-10 m-auto mt-6 md:mt-2 text-center hover:blur-none! transition-all grid grid-flow-col justify-center gap-x-4',
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

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  $footer?: boolean
}

export const Nav = ({ children, $footer = false, className, ...props }: NavProps) => {
  return (
    <nav className={cn(navVariants({ footer: $footer }), 'nav-scroll-anim', className)} {...props}>
      {children}
    </nav>
  )
}
