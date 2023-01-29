import { render, screen } from '@testing-library/react'
import { Introduction } from '@/components/Molecules/About/Introduction'
import { appWithTranslation } from 'next-i18next'
import type { NextRouter } from 'next/router'

const createProps = (locale = 'en', router: Partial<NextRouter> = {}) =>
  ({
    pageProps: {
      _nextI18Next: {
        initialI18nStore: {
          en: {
            common: {
              author: 'Ayu Nakata',
            },
          },
          ja: {
            common: {
              author: 'mieze',
            },
          },
        },
        initialLocale: locale,
        ns: ['common'],
        userConfig: {
          i18n: {
            defaultLocale: 'ja',
            locales: ['en', 'ja'],
          },
          default: {
            i18n: {
              locales: ['ja', 'en'],
              defaultLocale: 'ja',
            },
          },
        },
      },
    } as any,
    router: {
      locale: locale,

      route: '/about',
      pathname: '/about',
      query: {},
      asPath: '/about',
      isPreview: false,
      isFallback: false,

      ...router,
    },
  } as any)

const Component = appWithTranslation(() => <Introduction />)

const defaultRenderProps = createProps()

describe('英語での表示テスト', () => {
  test('作者が英語で表示されているか', () => {
    render(<Component {...defaultRenderProps} />)
    expect(screen.getByText('Ayu Nakata', { exact: false })).toBeInTheDocument()
  })
})
