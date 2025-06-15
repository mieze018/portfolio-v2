import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'
import { cva as _cva } from 'class-variance-authority'
import React from 'react'

// HTMLタグ用のprops型
type TwHtmlProps<
  T extends keyof JSX.IntrinsicElements,
  V extends ReturnType<typeof _cva>,
> = ComponentProps<T> & VariantProps<V>

/** HTMLタグ用のprops型 */
export const tw = <T extends keyof JSX.IntrinsicElements, V extends ReturnType<typeof _cva>>(
  tag: T,
  variants: V
) => {
  return forwardRef<React.ElementRef<T>, TwHtmlProps<T, V>>((allProps, ref) => {
    const { ...props } = allProps
    const Component = tag as React.ElementType
    // TypeScript型推論の複雑性を回避するため、明示的に型変換
    const variantConfig = allProps as Parameters<typeof variants>[0]
    const classNames = variants(variantConfig)
    return <Component ref={ref} className={classNames} {...props} />
  })
}

// Reactコンポーネント用のprops型
type TweComponentProps<
  T extends React.ElementType,
  V extends ReturnType<typeof _cva>,
> = React.ComponentPropsWithoutRef<T> &
  VariantProps<V> & {
    className?: string
  }

/** Reactコンポーネント継承用のラッパー */
export const twe = <T extends React.ElementType, V extends ReturnType<typeof _cva>>(
  component: T,
  variants: V
) => {
  const Component = forwardRef<React.ElementRef<T>, TweComponentProps<T, V>>((props, ref) => {
    const { className, ...restProps } = props

    // variantのクラス名を生成
    const variantClasses = variants(props as Parameters<V>[0])

    // 最終的なクラス名を結合
    const finalClassName = [variantClasses, className].filter(Boolean).join(' ')

    return React.createElement(component, {
      ref,
      className: finalClassName,
      ...restProps,
    })
  })

  Component.displayName = `twe(${
    typeof component === 'string'
      ? component
      : component.displayName || component.name || 'Component'
  })`

  return Component
}
/** importをまとめるためのそのままexport */
export const cva = _cva
