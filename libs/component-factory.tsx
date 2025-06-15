import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { cva as _cva } from 'class-variance-authority'
export const tw = <T extends keyof JSX.IntrinsicElements, V extends ReturnType<typeof _cva>>(
  tag: T,
  variants: V
) => {
  return forwardRef<React.ElementRef<T>, ComponentProps<T> & VariantProps<V>>(
    ({ className, ...props }, ref) => {
      const Component = tag as React.ElementType
      return <Component ref={ref} className={variants({ className, ...props })} {...props} />
    }
  )
}
export const cva = _cva
