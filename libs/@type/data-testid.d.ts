// eslint-disable-next-line
import { HTMLAttributes } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    'data-testid'?: string
  }
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    'data-testid'?: string
  }
}
