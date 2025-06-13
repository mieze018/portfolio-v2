import { cva } from 'class-variance-authority'

const centerVariants = cva('m-auto flex items-center justify-center')

export const Center = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={centerVariants({ className })} {...props} />
)
