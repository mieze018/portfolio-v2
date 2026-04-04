import type { VariantProps } from 'class-variance-authority'
import { cva as _cva } from 'class-variance-authority'

// HTMLタグ用のprops型
type IntrinsicTag = keyof HTMLElementTagNameMap
type LooseIntrinsicProps = {
  children?: unknown
  className?: string
  [key: string]: unknown
}
// Why: React 19 の型定義と既存 factory のジェネリクスが噛み合わず、
// JSX component として解釈させるには戻り値型の広い関数シグネチャが必要。
// Trade-off: ここだけ any を許容し、既存コンポーネント API を維持する。
// biome-ignore lint/suspicious/noExplicitAny: React 19 型との互換レイヤーとして意図的に any を使う
type ComponentLike<P = unknown> = ((props: P) => any) | (new (...args: unknown[]) => { props: P })
type PropsOf<T> = T extends IntrinsicTag
  ? LooseIntrinsicProps
  : T extends (props: infer P) => unknown
    ? P
    : T extends new (
          ...args: unknown[]
        ) => { props: infer P }
      ? P
      : never

type TwHtmlProps<T extends IntrinsicTag, V extends ReturnType<typeof _cva>> = PropsOf<T> &
  VariantProps<V>

/** HTMLタグ用のprops型 */
export const tw = <T extends IntrinsicTag, V extends ReturnType<typeof _cva>>(
  tag: T,
  variants: V
) => {
  const ComponentWithVariants = (allProps: TwHtmlProps<T, V>) => {
    // Why: className を先に分離しないと ...props でバリアントのクラス名が上書きされてしまう。
    // twe と同様に [variantClasses, className] でマージする。
    const { className, ...props } = allProps
    const Component = tag as keyof HTMLElementTagNameMap
    // TypeScript型推論の複雑性を回避するため、明示的に型変換
    const variantConfig = allProps as Parameters<typeof variants>[0]
    const classNames = variants(variantConfig)
    const mergedClassName = [classNames, className].filter(Boolean).join(' ')
    const componentProps = { className: mergedClassName, ...(props as Record<string, unknown>) }
    return <Component {...componentProps} />
  }

  return ComponentWithVariants
}

// Reactコンポーネント用のprops型
type TweComponentProps<
  T extends IntrinsicTag | ComponentLike,
  V extends ReturnType<typeof _cva>,
> = PropsOf<T> &
  VariantProps<V> & {
    className?: string
  }

/** Reactコンポーネント継承用のラッパー */
export const twe = <T extends IntrinsicTag | ComponentLike, V extends ReturnType<typeof _cva>>(
  component: T,
  variants: V
) => {
  const Component = (props: TweComponentProps<T, V>) => {
    const { className, ...restProps } = props
    // biome-ignore lint/suspicious/noExplicitAny: JSX component として扱うための最小限の橋渡し
    const WrappedComponent = component as (props: Record<string, unknown>) => any

    // variantのクラス名を生成
    const variantClasses = variants(props as Parameters<V>[0])

    // 最終的なクラス名を結合
    const finalClassName = [variantClasses, className].filter(Boolean).join(' ')

    const componentProps = {
      className: finalClassName,
      ...(restProps as Record<string, unknown>),
    }

    return <WrappedComponent {...componentProps} />
  }

  const componentName =
    typeof component === 'string'
      ? component
      : (component as { displayName?: string; name?: string }).displayName ||
        (component as { displayName?: string; name?: string }).name ||
        'Component'

  Component.displayName = `twe(${componentName})`

  return Component
}
/** importをまとめるためのそのままexport */
export const cva = _cva
