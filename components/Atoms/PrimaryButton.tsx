import { cva } from 'class-variance-authority'
import { forwardRef } from 'react'

const primaryButtonVariants = cva(
  'w-full text-sm py-2 px-4 rounded hover:bg-main/30 border-main/30 border active:bg-main/50 bg-main/10'
)

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, ...props }, ref) => {
    return <button className={primaryButtonVariants({ className })} ref={ref} {...props} />
  }
)

PrimaryButton.displayName = 'PrimaryButton'
