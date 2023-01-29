import 'stailwc'
import type { CSSProp, css as cssImport } from 'styled-components'
import type styledImport from 'styled-components'

export type TemplateFn<R> = (
  strings: Readonly<TemplateStringsArray>,
  ...values: readonly string[]
) => R

export type TwFn = TemplateFn<CSSProp>
export type TwComponentMap = {
  [K in keyof JSX.IntrinsicElements]: TemplateFn<TwComponent<K>>
}

export type TwComponent<K extends keyof JSX.IntrinsicElements> = (
  props: JSX.IntrinsicElements[K]
) => JSX.Element
declare module 'stailwc' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}
type TwComponentWrapper = <T extends ComponentType<any>>(
  component: T
) => TemplateFn<T>

declare module 'react' {
  // The css prop
  interface DOMAttributes<T> {
    css?: CSSProp
    tw?: string
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
    tw?: string
  }
}
declare global {
  const tw: TwFn & TwComponentMap & TwComponentWrapper
  namespace JSX {

    // The 'as' prop on styled components
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string | Element
    }
    interface IntrinsicAttributes extends React.Attributes {
      tw?: string
    }
  }
}
