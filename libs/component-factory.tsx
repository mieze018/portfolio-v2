import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps, ComponentType } from 'react'
import { forwardRef } from 'react'
import { cva as _cva } from 'class-variance-authority'

// HTMLタグかReactコンポーネントかを判別する型
type ElementOrComponent = keyof JSX.IntrinsicElements | ComponentType<Record<string, unknown>>

// propsの型を適切に推論する
type TwProps<
  T extends ElementOrComponent,
  V extends ReturnType<typeof _cva>,
> = T extends keyof JSX.IntrinsicElements
  ? ComponentProps<T> & VariantProps<V>
  : T extends ComponentType<infer P>
    ? P & VariantProps<V>
    : never

export const tw = <T extends ElementOrComponent, V extends ReturnType<typeof _cva>>(
  component: T,
  variants: V
) => {
  return forwardRef<
    T extends keyof JSX.IntrinsicElements ? React.ElementRef<T> : React.ComponentRef<T>,
    TwProps<T, V>
  >((allProps, ref) => {
    const { className, ...props } = allProps as TwProps<T, V> & { className?: string }
    const Component = component as React.ElementType

    // バリアント用のpropsを抽出
    const variantConfig = allProps as Parameters<typeof variants>[0]
    const variantClasses = variants(variantConfig)

    // 既存のclassNameとマージ
    const finalClassName = className ? `${variantClasses} ${className}` : variantClasses

    return <Component ref={ref} className={finalClassName} {...props} />
  })
}

export const cva = _cva
