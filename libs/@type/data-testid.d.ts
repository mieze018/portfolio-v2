import 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-testid'?: string
  }

  interface SVGProps<T> {
    'data-testid'?: string
  }
}
