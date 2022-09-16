import 'libs/i18n/config'

import { AnimatePresence } from 'framer-motion'
import App from 'next/app'

import type { AppContext, AppProps } from 'next/app'

import '../styles/global.css'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/TopBar'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <TopBar />
      <AnimatePresence
        mode="wait"
        initial={false}
        //TODO:現在のスクロール位置がコンテンツトップより上なら同じ位置にスクロール、そうでなければコンテンツトップにスクロール
        onExitComplete={() => window.scrollTo(1000, 0)}
      >
        <ContentsWrapper key={router.asPath}>
          <Component {...pageProps} />
        </ContentsWrapper>
        <Footer />
      </AnimatePresence>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(302, { Location: '/' })
    appContext.ctx.res.end()
    return
  }

  return { ...appProps }
}

export default MyApp
