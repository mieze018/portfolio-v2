import { render } from '@testing-library/react'
import type React from 'react'
import { cva, tw, twe } from './component-factory'

// テスト用のvariantsを定義
const buttonVariants = cva('base-button', {
  variants: {
    variant: {
      default: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      sm: 'px-2 py-1',
      lg: 'px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
})

describe('tw (component factory)', () => {
  test('tw関数が関数コンポーネントを返すこと', () => {
    const Button = tw('button', buttonVariants)

    // Why: React 19 では forwardRef を使わず plain function component を返す
    expect(typeof Button).toBe('function')
  })

  test('tw で作成したコンポーネントをレンダリングすると variant クラスが適用される', () => {
    const Button = tw('button', buttonVariants)
    const { container } = render(<Button variant="secondary" size="lg" />)
    const el = container.firstElementChild!

    expect(el.tagName).toBe('BUTTON')
    expect(el.className).toContain('bg-gray-500')
    expect(el.className).toContain('px-4 py-2')
  })

  test('variantsが正しく適用されること', () => {
    const variants = cva('base-class', {
      variants: {
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
    })

    expect(typeof variants).toBe('function')
    expect(variants()).toContain('base-class')
    expect(variants({ size: 'small' })).toContain('text-sm')
    expect(variants({ size: 'large' })).toContain('text-lg')
  })

  test('複数のHTML要素タグに対応していること', () => {
    const Button = tw('button', cva('btn'))
    const Div = tw('div', cva('div-base'))
    const Input = tw('input', cva('input-base'))
    const Span = tw('span', cva('span-base'))

    // すべてが関数コンポーネントとして生成されることを確認
    expect(typeof Button).toBe('function')
    expect(typeof Div).toBe('function')
    expect(typeof Input).toBe('function')
    expect(typeof Span).toBe('function')
  })

  test('複雑なvariantsの組み合わせが動作すること', () => {
    const complexVariants = cva('base', {
      variants: {
        variant: {
          primary: 'bg-blue text-white',
          secondary: 'bg-gray text-black',
        },
        size: {
          sm: 'p-2 text-sm',
          md: 'p-4 text-base',
          lg: 'p-6 text-lg',
        },
        rounded: {
          none: 'rounded-none',
          sm: 'rounded-sm',
          full: 'rounded-full',
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          size: 'lg',
          class: 'shadow-lg',
        },
      ],
      defaultVariants: {
        variant: 'primary',
        size: 'md',
        rounded: 'sm',
      },
    })

    const Component = tw('div', complexVariants)
    expect(typeof Component).toBe('function')

    // variantsが期待されるクラスを生成することを確認
    const defaultClasses = complexVariants()
    expect(defaultClasses).toContain('base')
    expect(defaultClasses).toContain('bg-blue')
    expect(defaultClasses).toContain('p-4')
    expect(defaultClasses).toContain('rounded-sm')

    // compoundVariant を含む組み合わせをテスト
    const primaryLarge = complexVariants({ variant: 'primary', size: 'lg' })
    expect(primaryLarge).toContain('shadow-lg')
    expect(primaryLarge).toContain('p-6')
    expect(primaryLarge).toContain('text-lg')
  })

  test('classNameパラメータが正しく処理されること', () => {
    const variants = cva('base-class')

    expect(variants()).toBe('base-class')
    expect(variants({ className: 'additional-class' })).toContain('base-class')
    expect(variants({ className: 'additional-class' })).toContain('additional-class')
    expect(variants({ className: 'class1 class2' })).toContain('class1')
    expect(variants({ className: 'class1 class2' })).toContain('class2')
  })

  test('variantsのpropsと標準HTML propsが同時に使用できること', () => {
    const buttonVariants = cva('btn', {
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          lg: 'btn-lg',
        },
      },
    })

    const Button = tw('button', buttonVariants)
    expect(typeof Button).toBe('function')

    // variantsとclassNameを組み合わせた場合のクラス生成をテスト
    expect(buttonVariants({ variant: 'primary', className: 'extra-class' })).toContain('btn')
    expect(buttonVariants({ variant: 'primary', className: 'extra-class' })).toContain(
      'btn-primary'
    )
    expect(buttonVariants({ variant: 'primary', className: 'extra-class' })).toContain(
      'extra-class'
    )
  })
})

// テスト用のコンポーネント
const TestComponent = ({
  children,
  testProp,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { testProp?: string }) => (
  <div data-testprop={testProp} {...props}>
    {children}
  </div>
)
TestComponent.displayName = 'TestComponent'

describe('twe (component wrapper)', () => {
  test('twe関数が関数コンポーネントを返すこと', () => {
    const WrappedComponent = twe(TestComponent, buttonVariants)
    expect(typeof WrappedComponent).toBe('function')
  })

  test('twe で作成したコンポーネントをレンダリングすると variant と className が結合される', () => {
    const variants = cva('base', {
      variants: { size: { sm: 'text-sm', lg: 'text-lg' } },
    })
    const Wrapped = twe(TestComponent, variants)
    const { container } = render(<Wrapped size="lg" className="extra" />)
    const el = container.firstElementChild!

    expect(el.className).toContain('base')
    expect(el.className).toContain('text-lg')
    expect(el.className).toContain('extra')
  })

  test('displayNameが正しく設定されること', () => {
    const WrappedComponent = twe(TestComponent, buttonVariants)
    expect(WrappedComponent.displayName).toBe('twe(TestComponent)')

    // 文字列コンポーネントの場合
    const WrappedDiv = twe('div', buttonVariants)
    expect(WrappedDiv.displayName).toBe('twe(div)')

    // 無名コンポーネントの場合
    const AnonymousComponent = (props: React.ComponentPropsWithoutRef<'div'>) => <div {...props} />
    const WrappedAnonymous = twe(AnonymousComponent, buttonVariants)
    expect(WrappedAnonymous.displayName).toBe('twe(AnonymousComponent)')

    // Why: displayName も name も持たないコンポーネントで 'Component' フォールバックを検証
    const noNameComponent = (props: Record<string, unknown>) => <div {...props} />
    Object.defineProperty(noNameComponent, 'name', { value: '', writable: true })
    const WrappedNoName = twe(noNameComponent as never, buttonVariants)
    expect(WrappedNoName.displayName).toBe('twe(Component)')
  })

  test('variantsが正しく適用されること', () => {
    const variants = cva('base-class', {
      variants: {
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
    })

    const WrappedComponent = twe(TestComponent, variants)
    expect(typeof WrappedComponent).toBe('function')

    expect(typeof variants).toBe('function')
    expect(variants()).toContain('base-class')
    expect(variants({ size: 'small' })).toContain('text-sm')
    expect(variants({ size: 'large' })).toContain('text-lg')
  })

  test('classNameプロパティが正しく結合されること', () => {
    const variants = cva('base-class', {
      variants: {
        variant: {
          primary: 'text-blue',
          secondary: 'text-gray',
        },
      },
    })

    const WrappedComponent = twe(TestComponent, variants)
    expect(typeof WrappedComponent).toBe('function')

    expect(variants({ variant: 'primary' })).toContain('base-class')
    expect(variants({ variant: 'primary' })).toContain('text-blue')

    expect(variants({ variant: 'primary', className: 'extra-class' })).toContain('base-class')
    expect(variants({ variant: 'primary', className: 'extra-class' })).toContain('text-blue')
    expect(variants({ variant: 'primary', className: 'extra-class' })).toContain('extra-class')
  })

  test('複雑なvariantsの組み合わせが動作すること', () => {
    const complexVariants = cva('base', {
      variants: {
        variant: {
          primary: 'bg-blue text-white',
          secondary: 'bg-gray text-black',
        },
        size: {
          sm: 'p-2 text-sm',
          md: 'p-4 text-base',
          lg: 'p-6 text-lg',
        },
        rounded: {
          none: 'rounded-none',
          sm: 'rounded-sm',
          full: 'rounded-full',
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          size: 'lg',
          class: 'shadow-lg',
        },
      ],
      defaultVariants: {
        variant: 'primary',
        size: 'md',
        rounded: 'sm',
      },
    })

    const WrappedComponent = twe(TestComponent, complexVariants)
    expect(typeof WrappedComponent).toBe('function')

    const defaultClasses = complexVariants()
    expect(defaultClasses).toContain('base')
    expect(defaultClasses).toContain('bg-blue')
    expect(defaultClasses).toContain('p-4')
    expect(defaultClasses).toContain('rounded-sm')

    const primaryLarge = complexVariants({ variant: 'primary', size: 'lg' })
    expect(primaryLarge).toContain('shadow-lg')
    expect(primaryLarge).toContain('p-6')
    expect(primaryLarge).toContain('text-lg')
  })

  test('既存のReactコンポーネントをラップできること', () => {
    const variants = cva('wrapper-class', {
      variants: {
        theme: {
          light: 'bg-white',
          dark: 'bg-black',
        },
      },
    })

    const WrappedComponent = twe(TestComponent, variants)
    expect(typeof WrappedComponent).toBe('function')
    expect(WrappedComponent.displayName).toBe('twe(TestComponent)')
  })

  test('HTML要素文字列でもコンポーネントを作成できること', () => {
    const variants = cva('button-base', {
      variants: {
        size: {
          sm: 'px-2 py-1',
          lg: 'px-4 py-2',
        },
      },
    })

    const Button = twe('button', variants)
    const Div = twe('div', variants)
    const Input = twe('input', variants)

    expect(typeof Button).toBe('function')
    expect(typeof Div).toBe('function')
    expect(typeof Input).toBe('function')

    expect(Button.displayName).toBe('twe(button)')
    expect(Div.displayName).toBe('twe(div)')
    expect(Input.displayName).toBe('twe(input)')
  })
})
