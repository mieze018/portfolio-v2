import { Analytics } from '@vercel/analytics/react'
import { appWithTranslation } from 'next-i18next'

import type { AppProps } from 'next/app'

import '../styles/global.css'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import Layout from 'components/Layout/Default'
import EngineerLayout from 'components/Layout/EngineerLayout'
import { GoogleAnalytics, usePageView } from 'libs/gtag'

function MyApp({ Component, pageProps, router }: AppProps) {
  usePageView()
  //urlに/codeを含むときはエンジニアポートフォリオ
  if (router.pathname.includes('/code')) {
    return (
      <RecoilRoot>
        <EngineerLayout>
          <GoogleAnalytics />
          {/* //router.asPathでハッシュを含む, router.pathnameでハッシュを含まない */}
          <ContentsWrapper $key={router.pathname}>
            <Component {...pageProps} />
          </ContentsWrapper>
        </EngineerLayout>
      </RecoilRoot>
    )
  }

  return (
    <Layout>
      <GoogleAnalytics />
      {/* //router.asPathでハッシュを含む, router.pathnameでハッシュを含まない */}
      <ContentsWrapper $key={router.pathname}>
        <Component {...pageProps} />
      </ContentsWrapper>

      <Analytics />
    </Layout>
  )
}

export default appWithTranslation(MyApp)
