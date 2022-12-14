import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import { RecoilRoot } from 'recoil'

import type { AppContext, AppProps } from 'next/app'

import '../styles/global.css'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import Layout from 'components/Layout/Default'
import { GoogleAnalytics, usePageView } from 'libs/gtag'

function MyApp({ Component, pageProps, router }: AppProps) {
  usePageView()
  return (
    <RecoilRoot>
      <Layout>
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
  const uaString = appContext?.ctx?.req?.headers['user-agent'] || ''

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location: '/' })
    appContext.ctx.res.end()
    return
  }

  return { ...appProps, uaString }
}

export default appWithTranslation(MyApp)
