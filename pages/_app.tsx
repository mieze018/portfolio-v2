import 'libs/i18n/config'

import { AnimatePresence } from 'framer-motion'

import type { AppProps } from 'next/app'

import '../styles/global.css'
import './index.css'
import '../components/Molecules/TopBar.css'
import { ContentsWrapper } from 'components/Atoms/ContentsWrapper'
import { Footer } from 'components/Molecules/Footer'
import { TopBar } from 'components/Molecules/TopBar'

function MyApp({ Component, pageProps, router }: AppProps) {
  console.log('router', router.asPath)
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
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default MyApp
