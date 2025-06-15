import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { cva as _cva } from 'class-variance-authority'

type TwProps<
  T extends keyof JSX.IntrinsicElements,
  V extends ReturnType<typeof _cva>,
> = ComponentProps<T> & VariantProps<V>

export const tw = <T extends keyof JSX.IntrinsicElements, V extends ReturnType<typeof _cva>>(
  tag: T,
  variants: V
) => {
  return forwardRef<React.ElementRef<T>, TwProps<T, V>>((allProps, ref) => {
    const { ...props } = allProps
    const Component = tag as React.ElementType
    // TypeScript型推論の複雑性を回避するため、明示的に型変換
    const variantConfig = allProps as Parameters<typeof variants>[0]
    const classNames = variants(variantConfig)
    return <Component ref={ref} className={classNames} {...props} />
  })
}
export const cva = _cva
