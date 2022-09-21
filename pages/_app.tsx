import 'libs/i18n/config'

import App from 'next/app'
import { RecoilRoot } from 'recoil'

import type { userAgentType } from 'libs/recoil/atoms'
import type { AppContext, AppProps } from 'next/app'

import '../styles/global.css'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import Layout from 'components/Layout/Default'
import { GoogleAnalytics, usePageView } from 'libs/gtag'
import { getUserAgent } from 'libs/nextjs-device-detect'

function MyApp({
  Component,
  pageProps,
  router,
  userAgent,
}: AppProps & { userAgent: userAgentType }) {
  usePageView()
  return (
    <RecoilRoot>
      <Layout userAgent={userAgent}>
        <GoogleAnalytics />
        {/* //router.asPathでハッシュを含む, router.pathnameでハッシュを含まない */}
        <ContentsWrapper $key={router.pathname}>
          <Component {...pageProps} />
        </ContentsWrapper>
      </Layout>
    </RecoilRoot>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const userAgent = getUserAgent(appContext.ctx.req)

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location: '/' })
    appContext.ctx.res.end()
    return
  }

  return { ...appProps, userAgent }
}

export default MyApp
