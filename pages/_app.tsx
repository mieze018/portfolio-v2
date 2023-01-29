import { Analytics } from '@vercel/analytics/react'
import { appWithTranslation } from 'next-i18next'
import { TailwindStyle } from "stailwc";

import type { AppProps } from 'next/app'

import '../styles/global.css'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import Layout from 'components/Layout/Default'
import { GoogleAnalytics, usePageView } from 'libs/gtag'

function MyApp({ Component, pageProps, router }: AppProps) {
  usePageView()
  return (
    <Layout>
      <TailwindStyle />
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
