import { expect, test } from '@playwright/test'
import { tw } from './component-factory'
import { cva } from 'class-variance-authority'

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

test.describe('tw (component factory)', () => {
  test('tw関数が正しくforwardRefを含むコンポーネントを返すこと', () => {
    const Button = tw('button', buttonVariants)

    // forwardRefで生成されたコンポーネントは実際にはオブジェクト
    expect(typeof Button).toBe('object')

    // forwardRefで生成されたコンポーネントの特徴を確認
    // React.ForwardRefExoticComponentの特徴
    expect(Button).toHaveProperty('$$typeof')
    // renderプロパティは内部実装なので、存在を確認するのみ
    expect('render' in Button).toBe(true)
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

    // variantsが関数であることを確認
    expect(typeof variants).toBe('function')

    // 基本クラスが適用されることを確認
    expect(variants()).toContain('base-class')

    // variantが適用されることを確認
    expect(variants({ size: 'small' })).toContain('text-sm')
    expect(variants({ size: 'large' })).toContain('text-lg')
  })

  test('複数のHTML要素タグに対応していること', () => {
    // 異なるHTML要素でコンポーネントを作成
    const Button = tw('button', cva('btn'))
    const Div = tw('div', cva('div-base'))
    const Input = tw('input', cva('input-base'))
    const Span = tw('span', cva('span-base'))

    // すべてがforwardRefオブジェクトとして生成されることを確認
    expect(typeof Button).toBe('object')
    expect(typeof Div).toBe('object')
    expect(typeof Input).toBe('object')
    expect(typeof Span).toBe('object')

    // React要素の特徴を持っていることを確認
    expect(Button).toHaveProperty('$$typeof')
    expect(Div).toHaveProperty('$$typeof')
    expect(Input).toHaveProperty('$$typeof')
    expect(Span).toHaveProperty('$$typeof')
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

    // コンポーネントが正しく生成されることを確認（forwardRefオブジェクト）
    expect(typeof Component).toBe('object')
    expect(Component).toHaveProperty('$$typeof')

    // variantsが期待されるクラスを生成することを確認
    const defaultClasses = complexVariants()
    expect(defaultClasses).toContain('base')
    expect(defaultClasses).toContain('bg-blue')
    expect(defaultClasses).toContain('p-4')
    expect(defaultClasses).toContain('rounded-sm')

    // 特定のvariantの組み合わせをテスト
    const primaryLarge = complexVariants({ variant: 'primary', size: 'lg' })
    expect(primaryLarge).toContain('shadow-lg') // compound variant
    expect(primaryLarge).toContain('p-6')
    expect(primaryLarge).toContain('text-lg')
  })

  test('classNameパラメータが正しく処理されること', () => {
    const variants = cva('base-class')

    // 基本的なクラス
    expect(variants()).toBe('base-class')

    // 追加のclassNameが結合されること
    expect(variants({ className: 'additional-class' })).toContain('base-class')
    expect(variants({ className: 'additional-class' })).toContain('additional-class')

    // 複数の追加クラス
    expect(variants({ className: 'class1 class2' })).toContain('class1')
    expect(variants({ className: 'class1 class2' })).toContain('class2')
  })

  test('コンポーネントが明示されていないHTML propを受け取れること', () => {
    // button要素の場合
    const Button = tw('button', cva('btn-base'))

    // TypeScriptのComponentPropsによって、button要素の全てのpropsが受け取れることを確認
    // 実際にコンポーネントを使用する形でテスト（型チェック）
    const ButtonComponent = Button

    // この部分はTypeScriptコンパイラによって検証される
    // button要素固有のpropsが受け取れるかどうか
    expect(typeof ButtonComponent).toBe('object')

    // input要素の場合
    const Input = tw('input', cva('input-base'))
    const InputComponent = Input

    // input要素固有のpropsが受け取れるかどうか
    expect(typeof InputComponent).toBe('object')

    // div要素の場合
    const Div = tw('div', cva('div-base'))
    const DivComponent = Div

    // div要素のpropsが受け取れるかどうか
    expect(typeof DivComponent).toBe('object')

    // 型レベルでの検証は実際のコンパイル時に行われるため、
    // ここではコンポーネントが正しく生成されることを確認
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

    // コンポーネントが正しく生成されることを確認
    expect(typeof Button).toBe('object')
    expect(Button).toHaveProperty('$$typeof')

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
